import type { Product } from "../../../types/Product";
import Button from "../../atoms/Button";
import Card from "../../molecules/Card";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  isLoading = false,
}: ProductTableProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </Card>
    );
  }

  if (products.length === 0) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">
          No products found. Create your first product!
        </div>
      </Card>
    );
  }

  return (
    <Card title="Products List">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  ${Number(product.value).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => onEdit(product)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (confirm(`Delete product "${product.name}"?`)) {
                          onDelete(product.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
