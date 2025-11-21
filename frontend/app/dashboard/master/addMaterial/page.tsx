"use client";
import { useState, useEffect } from "react";
import InputField from "@/app/components/inputfields";
import SelectField from "@/app/components/selectfields";
import TextAreaField from "@/app/components/textareafields";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AddMaterialPage() {
  const { token } = useAuth();
  const [commodityCode, setCommodityCode] = useState("");
  const [description, setDescription] = useState("");
  const [uom, setUom] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [groupId, setGroupId] = useState("");
  const [materialGroups, setMaterialGroups] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await fetch(`${API_URL}/v1/material-groups/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (response.ok) {
          const data = await response.json();
          setMaterialGroups(data.items || data.groups || data || []);
        }
      } catch (error) {
        // Silently fail if endpoint doesn't exist
      }
    }
    fetchGroups();
    
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ commodityCode, description, groupId });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-black">
      <h1 className="text-2xl font-semibold mb-6 text-left">Add Material</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid for 4 input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Material Code"
            value={commodityCode}
            onChange={(e) => setCommodityCode(e.target.value)}
            placeholder="Enter commodity code"
          />
          <InputField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
          <InputField
            label="Drawing No."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter drawing number"
          />
          <SelectField
            label="Is Stockable"
            value={uom}
            onChange={(e) => setUom(e.target.value)}
            options={[
              { label: "Yes", value: "1" },
              { label: "No", value: "0" },
            ]}
            placeholder="Select Unit of Measure"
          />
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <TextAreaField
              label="Detail Description"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Enter any additional notes"
            />
          </div>

          <SelectField
            label="Material Group"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            options={materialGroups.map((g) => ({
              label: g.name,
              value: g.id.toString(),
            }))}
            placeholder="Select group"
          />

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
