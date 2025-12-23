import React from 'react';

export default function ReusableTable({ columns, data, onSort, sortKey }) {
    return (
        <table className="w-full">
            <thead className="bg-[#333333] text-white">
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.key}
                        onClick={col.sortable ? () => onSort(col.key) : undefined}
                        className={`px-6 py-3 ${col.sortable ? 'cursor-pointer' : ''}`}
                    >
                        {col.label}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={row.id} className="border-t">
                    {columns.map((col) => (
                        <td key={col.key} className="px-6 py-3">
                            {col.render ? col.render(row) : row[col.key]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}