import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { Product } from "../../../types/Product";
import {
  deleteProduct,
  fetchProducts,
} from "../../../store/products/productSlice";
import type { AppDispatch, RootState } from "../../../store";
import ProductTable from "../../organisms/ProductTable";
import ProductFormModal from "../../organisms/ProductFormModal";
import Button from "../../atoms/Button";
import toast from "react-hot-toast";

export default function ProductsTemplate() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const loadingToast = toast.loading("Deleting product...");

    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully!", {
        id: loadingToast,
      });
    } catch (error: any) {
      toast.error(error?.message || "Error deleting product!", {
        id: loadingToast,
      });
      console.error("Error deleting product:", error);
    }
  };

  if (loading && data.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-end items-center mt-6 mr-6">
        <Button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
        >
          New Product
        </Button>
      </div>

      <ProductTable
        products={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={loading}
      />

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
