import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import {
  createRawMaterial,
  updateRawMaterial,
} from "../../../store/rawMaterials/rawMaterialSlice";
import RawMaterialForm from "../RawMaterialForm";
import Button from "../../atoms/Button";
import type { RawMaterial } from "../../../types/RawMaterial";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface RawMaterialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawMaterial?: RawMaterial | null;
}

export default function RawMaterialFormModal({
  isOpen,
  onClose,
  rawMaterial,
}: RawMaterialFormModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.rawMaterials);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    quantity_stock: "",
  });

  const initialFormState = {
    code: "",
    name: "",
    quantity_stock: "",
  };

  useEffect(() => {
    if (isOpen) {
      if (rawMaterial) {
        setFormData({
          code: rawMaterial.code,
          name: rawMaterial.name,
          quantity_stock: rawMaterial.quantity_stock.toString(),
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [rawMaterial, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      code: formData.code.trim(),
      name: formData.name.trim(),
      quantity_stock: Number(formData.quantity_stock),
    };

    try {
      if (rawMaterial?.id) {
        await dispatch(
          updateRawMaterial({ ...payload, id: rawMaterial.id }),
        ).unwrap();
        toast.success("Raw material updated successfully!");
      } else {
        await dispatch(createRawMaterial(payload)).unwrap();
        toast.success("Raw material created successfully!");
      }

      setFormData(initialFormState);
      onClose();
    } catch (error: any) {
      const errorMessage = error || "Error saving raw material!";
      toast.error(errorMessage);
      console.error("Error saving raw material:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-105 rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          {rawMaterial ? "Edit Raw Material" : "New Raw Material"}
        </h2>

        <form onSubmit={handleSubmit}>
          <RawMaterialForm
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
