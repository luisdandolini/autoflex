import Card from "../../molecules/Card";
import FormField from "../../molecules/FormField";

interface RawMaterialFormProps {
  formData: {
    code: string;
    name: string;
    quantity_stock: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

export default function RawMaterialForm({
  formData,
  onChange,
  errors = {},
  isLoading = false,
}: RawMaterialFormProps) {
  return (
    <Card>
      <FormField
        label="Code"
        value={formData.code}
        onChange={(value) => onChange("code", value)}
        required
        error={errors.code}
        disabled={isLoading}
        placeholder="R001"
      />

      <FormField
        label="Name"
        value={formData.name}
        onChange={(value) => onChange("name", value)}
        required
        error={errors.name}
        disabled={isLoading}
        placeholder="Steel"
      />

      <FormField
        label="Stock Quantity"
        value={formData.quantity_stock}
        onChange={(value) => onChange("quantity_stock", value)}
        type="number"
        required
        error={errors.quantity_stock}
        disabled={isLoading}
        min={0}
        step="0.01"
        placeholder="100.00"
      />
    </Card>
  );
}
