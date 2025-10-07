import React from "react";
type Column<T> = {
  key: keyof T | string; // which field in data
  label: string; // table header
  render?: (item: T) => React.ReactNode; // custom render (optional)
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

const DataTable = <T extends { id: number | string }>({
  data,
  columns,
}: DataTableProps<T>) => {
  return (
    <div className="bg-[#1e1e1e] text-white p-4 rounded-md w-full max-h-max text-sm">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-md">
          <thead>
            <tr className="bg-[#2a2a2a] text-gray-300">
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className="p-2 border border-gray-700 text-left"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.id} className="border border-gray-700">
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className="p-2 border border-gray-700"
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
