"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function AddMaterialButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard/master/material/addMaterial");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      + Add Material
    </button>
  );
}
