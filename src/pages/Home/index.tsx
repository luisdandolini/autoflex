import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/products/productSlice";
import { fetchRawMaterials } from "../../store/rawMaterials/rawMaterialSlice";
import type { AppDispatch, RootState } from "../../store";
import Card from "../../components/molecules/Card";
import Button from "../../components/atoms/Button";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { data: products } = useSelector((state: RootState) => state.products);
  const { data: rawMaterials } = useSelector(
    (state: RootState) => state.rawMaterials,
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Autoflex - Production Management System
        </h1>
        <p className="text-gray-600">
          Manage your products, raw materials and optimize production
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Products
            </h3>
            <p className="text-4xl font-bold text-blue-600 mb-4">
              {products.length}
            </p>
            <Link to="/products">
              <Button variant="secondary" fullWidth>
                View All
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Raw Materials
            </h3>
            <p className="text-4xl font-bold text-green-600 mb-4">
              {rawMaterials.length}
            </p>
            <Link to="/raw-materials">
              <Button variant="secondary" fullWidth>
                View All
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Production
            </h3>
            <p className="text-4xl font-bold text-purple-600 mb-4">Calculate</p>
            <Link to="/production">
              <Button fullWidth>View Suggestions</Button>
            </Link>
          </div>
        </Card>
      </div>

      <Card title="Quick Actions" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/products">
            <Button variant="secondary" fullWidth>
              + New Product
            </Button>
          </Link>

          <Link to="/raw-materials">
            <Button variant="secondary" fullWidth>
              + New Raw Material
            </Button>
          </Link>

          <Link to="/associations">
            <Button variant="secondary" fullWidth>
              Associate Materials
            </Button>
          </Link>

          <Link to="/production">
            <Button fullWidth>Calculate Production</Button>
          </Link>
        </div>
      </Card>

      <Card title="Getting Started">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-gray-800">Create Products</h4>
              <p className="text-gray-600 text-sm">
                Start by registering the products your industry manufactures
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-gray-800">Add Raw Materials</h4>
              <p className="text-gray-600 text-sm">
                Register raw materials and their current stock quantities
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-gray-800">
                Associate Materials
              </h4>
              <p className="text-gray-600 text-sm">
                Link raw materials to products and specify required quantities
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-gray-800">
                Calculate Production
              </h4>
              <p className="text-gray-600 text-sm">
                Get optimized production suggestions based on available stock
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
