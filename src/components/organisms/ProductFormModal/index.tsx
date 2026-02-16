import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { createProduct } from "../../../store/products/productSlice";
import ProductForm from "../ProductForm";
import Button from "../../atoms/Button";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductFormModal({
  isOpen,
  onClose,
}: ProductFormModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.products);

  if (!isOpen) return null;

  const handleSubmit = async (data: any) => {
    try {
      await dispatch(createProduct(data)).unwrap();
      onClose();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-105 rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          Novo Produto
        </h2>

        <ProductForm onSubmit={handleSubmit} />

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
