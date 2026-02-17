import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RawMaterial } from "../../../types/RawMaterial";
import {
  deleteRawMaterial,
  fetchRawMaterials,
} from "../../../store/rawMaterials/rawMaterialSlice";
import type { AppDispatch, RootState } from "../../../store";
import RawMaterialTable from "../../organisms/RawMaterialTable";
import Button from "../../atoms/Button";
import toast from "react-hot-toast";
import RawMaterialFormModal from "../../organisms/RawMaterialFormModal";

export default function RawMaterialsTemplate() {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRawMaterial, setSelectedRawMaterial] =
    useState<RawMaterial | null>(null);

  const { data, loading } = useSelector(
    (state: RootState) => state.rawMaterials,
  );

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleEdit = (rawMaterial: RawMaterial) => {
    setSelectedRawMaterial(rawMaterial);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const loadingToast = toast.loading("Deleting raw material...");

    try {
      await dispatch(deleteRawMaterial(id)).unwrap();
      toast.success("Raw material deleted successfully!", {
        id: loadingToast,
      });
    } catch (error: any) {
      toast.error(error || "Error deleting raw material!", {
        id: loadingToast,
      });
      console.error("Error deleting raw material:", error);
    }
  };

  if (loading && data.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-end items-center mt-6 mr-6">
        <Button
          onClick={() => {
            setSelectedRawMaterial(null);
            setIsModalOpen(true);
          }}
        >
          New Raw Material
        </Button>
      </div>

      <RawMaterialTable
        rawMaterials={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={loading}
      />

      <RawMaterialFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawMaterial={selectedRawMaterial}
      />
    </div>
  );
}
