import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "../../../store";
import { fetchProducts } from "../../../store/products/productSlice";
import { fetchRawMaterials } from "../../../store/rawMaterials/rawMaterialSlice";
import api from "../../../services/api";
import Card from "../../molecules/Card";
import Button from "../../atoms/Button";
import type { Association } from "../../../types/Association";

export default function AssociationsTemplate() {
  const dispatch = useDispatch<AppDispatch>();

  const { data: products } = useSelector((state: RootState) => state.products);
  const { data: rawMaterials } = useSelector(
    (state: RootState) => state.rawMaterials,
  );

  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [associations, setAssociations] = useState<Association[]>([]);
  const [selectedRawMaterialId, setSelectedRawMaterialId] =
    useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProductId) {
      loadAssociations();
    } else {
      setAssociations([]);
    }
  }, [selectedProductId]);

  const loadAssociations = async () => {
    if (!selectedProductId) return;
    setLoading(true);
    try {
      const response = await api.get(
        `/products/${selectedProductId}/raw-materials`,
      );
      setAssociations(response.data.data || []);
    } catch (error: any) {
      console.error("Error loading associations:", error);
      setAssociations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAssociation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId) return toast.error("Please select a product first");
    if (!selectedRawMaterialId)
      return toast.error("Please select a raw material");
    if (!quantity || Number(quantity) <= 0)
      return toast.error("Quantity must be greater than 0");

    setLoading(true);
    try {
      await api.post(`/products/${selectedProductId}/raw-materials`, {
        raw_material_id: selectedRawMaterialId,
        quantity_needed: Number(quantity),
      });

      toast.success("Association created successfully! 🎉");
      setSelectedRawMaterialId("");
      setQuantity("");
      await loadAssociations();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error creating association",
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  const availableRawMaterials = rawMaterials.filter(
    (rm) =>
      !associations.find(
        (association) => association.raw_material_id === rm.id,
      ),
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Product Associations
        </h1>
        <p className="text-gray-600 mt-1">
          Link raw materials to products and define required quantities
        </p>
      </div>

      <Card className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Product <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select a product --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.code} - {product.name}
            </option>
          ))}
        </select>
      </Card>

      {selectedProductId && (
        <>
          <Card
            title={`Associated Materials: ${selectedProduct?.name}`}
            className="mb-6"
          >
            {loading && associations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : associations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No materials associated yet. Add one below!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Raw Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity Needed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Stock Available
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {associations.map((association) => (
                      <tr key={association.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-mono text-gray-900">
                          {association.raw_material_code}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {association.raw_material_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {Number(association.quantity_needed).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {Number(association.quantity_stock).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card title="Add New Material">
            <form onSubmit={handleAddAssociation}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Raw Material *
                  </label>
                  <select
                    value={selectedRawMaterialId}
                    onChange={(e) => setSelectedRawMaterialId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    <option value="">Select raw material</option>
                    {availableRawMaterials.map((rm) => (
                      <option key={rm.id} value={rm.id}>
                        {rm.code} - {rm.name} (Stock:{" "}
                        {Number(rm.quantity_stock).toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity Needed *
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="5.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} fullWidth>
                {loading ? "Adding..." : "Add Association"}
              </Button>
            </form>
          </Card>
        </>
      )}
    </div>
  );
}
