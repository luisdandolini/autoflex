interface InputProps {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  min?: number;
  step?: string;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  min,
  step,
}: InputProps) {
  const baseClasses =
    "w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed";

  const stateClasses = error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        min={min}
        step={step}
        className={`${baseClasses} ${stateClasses}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
