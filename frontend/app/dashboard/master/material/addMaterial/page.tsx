"use client";
import { useState } from "react";
import InputField from "@/app/components/inputfields";

export default function AddMaterialPage() {
  const [commodityCode, setCommodityCode] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ commodityCode, description });
  };

  return (
    <div className="p-6 max-w-md text-black">
      <h1 className="text-2xl font-semibold mb-6 text-left">Add Material</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <InputField
              label="Commodity Code"
              value={commodityCode}
              onChange={(e) => setCommodityCode(e.target.value)}
              placeholder="Enter commodity code"
            />
          </div>
          <div className="w-1/2">
            <InputField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Material
        </button>
      </form>
    </div>
  );
}
