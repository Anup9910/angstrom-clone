'use client';
import React from "react";

type Material = {
  id: number;
  commodityCode: string;
  description: string;
};

export default function MaterialTable({ materials }: { materials: Material[] }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border-b text-black">ID</th>
            <th className="p-3 text-left border-b text-black">Commodity Code</th>
            <th className="p-3 text-left border-b text-black">Description</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id} className="hover:bg-gray-50">
              <td className="p-3 border-b text-black">{material.id}</td>
              <td className="p-3 border-b text-black">{material.commodityCode}</td>
              <td className="p-3 border-b text-black">{material.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}