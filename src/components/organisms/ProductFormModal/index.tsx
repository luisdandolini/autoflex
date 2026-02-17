import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import {
  createProduct,
  updateProduct,
} from "../../../store/products/productSlice";
import ProductForm from "../ProductForm";
import Button from "../../atoms/Button";
import type { Product } from "../../../types/Product";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  product,
}: ProductFormModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.products);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    value: "",
  });

  const initialFormState = {
    code: "",
    name: "",
    value: "",
  };

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({
          code: product.code,
          name: product.name,
          value: product.value.toString(),
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      code: formData.code.trim(),
      name: formData.name.trim(),
      value: Number(formData.value),
    };

    try {
      if (product?.id) {
        await dispatch(updateProduct({ ...payload, id: product.id })).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await dispatch(createProduct(payload)).unwrap();
        toast.success("Product created successfully!");
      }

      setFormData(initialFormState);
      onClose();
    } catch (error: any) {
      const errorMessage = error || "Error saving product!";
      toast.error(errorMessage);
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-105 rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          {product ? "Edit Product" : "New Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <ProductForm
            formData={formData}
            onChange={handleChange}
            isLoading={loading}
          />

          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
