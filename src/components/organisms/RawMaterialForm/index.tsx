import { useState } from "react";
import Card from "../../molecules/Card";
import FormField from "../../molecules/FormField";
import Button from "../../atoms/Button";

interface RawMaterialFormProps {
  onSubmit: (data: RawMaterialData) => void;
  initialData?: RawMaterialData;
  isLoading?: boolean;
}

interface RawMaterialData {
  code: string;
  name: string;
  quantity_stock: number;
}

export default function RawMaterialForm({
  onSubmit,
  initialData,
  isLoading = false,
}: RawMaterialFormProps) {
  const [code, setCode] = useState(initialData?.code || "");
  const [name, setName] = useState(initialData?.name || "");
  const [quantityStock, setQuantityStock] = useState(
    initialData?.quantity_stock?.toString() || "",
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!code.trim()) newErrors.code = "Code is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!quantityStock || Number(quantityStock) < 0) {
      newErrors.quantity_stock = "Quantity must be 0 or greater";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        code: code.trim(),
        name: name.trim(),
        quantity_stock: Number(quantityStock),
      });
    }
  };

  return (
    <Card title={initialData ? "Edit Raw Material" : "New Raw Material"}>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Code"
          value={code}
          onChange={setCode}
          required
          error={errors.code}
          disabled={isLoading}
          placeholder="R001"
        />

        <FormField
          label="Name"
          value={name}
          onChange={setName}
          required
          error={errors.name}
          disabled={isLoading}
          placeholder="Steel"
        />

        <FormField
          label="Quantity in Stock"
          value={quantityStock}
          onChange={setQuantityStock}
          type="number"
          required
          error={errors.quantity_stock}
          disabled={isLoading}
          min={0}
          step="0.01"
          placeholder="100"
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading} fullWidth>
            {isLoading
              ? "Saving..."
              : initialData
                ? "Update Raw Material"
                : "Create Raw Material"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
