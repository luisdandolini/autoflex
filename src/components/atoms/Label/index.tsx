interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}

export default function Label({
  children,
  required = false,
  htmlFor,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
