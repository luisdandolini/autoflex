import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api";
import Button from "../../atoms/Button";
import Card from "../../molecules/Card";
import type { ProductionResponse } from "../../../types/Production";

export default function Production() {
  const [data, setData] = useState<ProductionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (isManual = false) => {
    setLoading(true);
    try {
      const response = await api.get("/production/suggestions");
      setData(response.data);

      if (isManual) {
        toast.success("Production recalculated successfully!");
      }
    } catch (error: any) {
      console.error("Error fetching production suggestions:", error);

      if (isManual) {
        toast.error(
          error?.response?.data?.message || "Error calculating production",
        );
      }

      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  if (loading && !data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-100">
          <div className="text-center">
            <p className="text-xl text-gray-600">Calculating production...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Data Available
            </h3>
            <p className="text-gray-600 mb-4">
              Unable to load production data.
            </p>
            <Button onClick={fetchSuggestions}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Production Suggestions
          </h1>
          <p className="text-gray-600 mt-1">
            Optimized production based on available stock
          </p>
        </div>
        <Button onClick={fetchSuggestions} disabled={loading}>
          {loading ? "Calculating..." : "Recalculate"}
        </Button>
      </div>

      <Card className="mb-6 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <p className="text-sm text-gray-600 uppercase tracking-wide mb-2">
            Total Production Value
          </p>
          <p className="text-5xl font-bold text-blue-600 mb-2">
            ${(data.total_production_value || 0).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            {data.products_analyzedL || 0} products analyzed •{" "}
            {data.suggestions?.length || 0} can be produced
          </p>
        </div>
      </Card>

      {(!data.suggestions || data.suggestions.length === 0) && (
        <Card>
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Production Possible
            </h3>
            <p className="text-gray-600 mb-4">
              Not enough raw materials in stock to produce any products.
            </p>
            <p className="text-sm text-gray-500">
              Add more raw materials to your stock or create product
              associations.
            </p>
          </div>
        </Card>
      )}

      {data.suggestions && data.suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.suggestions.map((suggestion, index) => (
            <Card
              key={suggestion.product_id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Priority #{index + 1}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Code</p>
                  <p className="font-mono text-sm font-semibold text-gray-700">
                    {suggestion.product_code}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {suggestion.product_name}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Quantity Possible:
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {suggestion.quantity_possible} units
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Unit Value:</span>
                  <span className="text-lg font-semibold text-gray-700">
                    ${Number(suggestion.unit_value).toFixed(2)}{" "}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Total Value:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ${Number(suggestion.total_value).toFixed(2)}{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        ((suggestion.total_value || 0) /
                          (data.total_production_value || 1)) *
                          100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {(
                    ((suggestion.total_value || 0) /
                      (data.total_production_value || 1)) *
                    100
                  ).toFixed(1)}
                  % of total value
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
