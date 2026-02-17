import type { RawMaterial } from "../../../types/RawMaterial";
import Button from "../../atoms/Button";
import Card from "../../molecules/Card";

interface RawMaterialTableProps {
  rawMaterials: RawMaterial[];
  onEdit: (rawMaterial: RawMaterial) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function RawMaterialTable({
  rawMaterials,
  onEdit,
  onDelete,
  isLoading = false,
}: RawMaterialTableProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </Card>
    );
  }

  if (rawMaterials.length === 0) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">
          No raw materials found. Create your first raw material!{" "}
        </div>
      </Card>
    );
  }

  return (
    <Card title="Raw Materials List">
      {" "}
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
                Stock Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rawMaterials.map((rawMaterial) => (
              <tr key={rawMaterial.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {rawMaterial.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {rawMaterial.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {Number(rawMaterial.quantity_stock).toFixed(2)}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(rawMaterial)}
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (
                          confirm(`Delete raw material "${rawMaterial.name}"?`)
                        ) {
                          onDelete(rawMaterial.id);
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
