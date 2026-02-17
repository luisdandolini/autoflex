import Card from "../../molecules/Card";
import FormField from "../../molecules/FormField";

interface ProductFormProps {
  formData: {
    code: string;
    name: string;
    value: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

export default function ProductForm({
  formData,
  onChange,
  errors = {},
  isLoading = false,
}: ProductFormProps) {
  return (
    <Card>
      <FormField
        label="Code"
        value={formData.code}
        onChange={(value) => onChange("code", value)}
        required
        error={errors.code}
        disabled={isLoading}
        placeholder="P001"
      />

      <FormField
        label="Name"
        value={formData.name}
        onChange={(value) => onChange("name", value)}
        required
        error={errors.name}
        disabled={isLoading}
        placeholder="Gaming Chair"
      />

      <FormField
        label="Value"
        value={formData.value}
        onChange={(value) => onChange("value", value)}
        type="number"
        required
        error={errors.value}
        disabled={isLoading}
        min={0}
        step="0.01"
        placeholder="1500.00"
      />
    </Card>
  );
}
