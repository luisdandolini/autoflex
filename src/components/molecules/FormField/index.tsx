import Input from "../../atoms/Input";
import Label from "../../atoms/Label";

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  min?: number;
  step?: string;
}

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  error,
  disabled = false,
  min,
  step,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <Label required={required}>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={error}
        min={min}
        step={step}
      />
    </div>
  );
}
