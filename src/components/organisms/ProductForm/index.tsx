import { useState } from "react";
import Card from "../../molecules/Card";
import FormField from "../../molecules/FormField";
import Button from "../../atoms/Button";

interface ProductFormProps {
  onSubmit: (data: ProductData) => void;
  initialData?: ProductData;
  isLoading?: boolean;
}

interface ProductData {
  code: string;
  name: string;
  value: number;
}

export default function ProductForm({
  onSubmit,
  initialData,
  isLoading = false,
}: ProductFormProps) {
  const [code, setCode] = useState(initialData?.code || "");
  const [name, setName] = useState(initialData?.name || "");
  const [value, setValue] = useState(initialData?.value?.toString() || "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!code.trim()) newErrors.code = "Code is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!value || Number(value) <= 0)
      newErrors.value = "Value must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        code: code.trim(),
        name: name.trim(),
        value: Number(value),
      });
    }
  };

  return (
    <Card title={initialData ? "Edit Product" : "New Product"}>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Code"
          value={code}
          onChange={setCode}
          required
          error={errors.code}
          disabled={isLoading}
          placeholder="P001"
        />

        <FormField
          label="Name"
          value={name}
          onChange={setName}
          required
          error={errors.name}
          disabled={isLoading}
          placeholder="Gaming Chair"
        />

        <FormField
          label="Value"
          value={value}
          onChange={setValue}
          type="number"
          required
          error={errors.value}
          disabled={isLoading}
          min={0}
          step="0.01"
          placeholder="1500.00"
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading} fullWidth>
            {isLoading
              ? "Saving..."
              : initialData
                ? "Update Product"
                : "Create Product"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
