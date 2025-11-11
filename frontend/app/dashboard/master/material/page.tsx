"use client";

import { useEffect, useState } from "react";
import AddMaterialButton from "./addMaterialButton";
import MaterialTable from "./materialTable";
import { useAuth } from "@/contexts/AuthContext";

type Material = {
  id: number;
  commodityCode: string;
  description: string;
};

type MaterialApiItem = {
  id: number;
  commodity_code: string;
  description: string;
};

type MaterialApiResponse = {
  items: MaterialApiItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

type ApiErrorResponse = {
  detail?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function MaterialPage() {
  const { token, isLoading: authIsLoading } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authIsLoading) {
      return;
    }

    const controller = new AbortController();

    async function fetchMaterials() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/v1/material-master?page=1&page_size=25`, {
          method: "GET",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
          signal: controller.signal,
        });

        const parsedBody: MaterialApiResponse | ApiErrorResponse | null = await response
          .json()
          .catch(() => null);

        if (!response.ok) {
          const message = (parsedBody as ApiErrorResponse)?.detail || "Failed to fetch materials";
          throw new Error(message);
        }

        if (!parsedBody || !("items" in parsedBody)) {
          throw new Error("Unexpected response from server");
        }

        const normalizedMaterials = parsedBody.items.map((item) => ({
          id: item.id,
          commodityCode: item.commodity_code,
          description: item.description,
        }));

        setMaterials(normalizedMaterials);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        const message = fetchError instanceof Error ? fetchError.message : "An unexpected error occurred";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMaterials();

    return () => {
      controller.abort();
    };
  }, [authIsLoading, token]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center text-black">
        <h1 className="text-2xl font-semibold text-black">Material Listing</h1>
        <AddMaterialButton />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {isLoading ? (
        <p className="text-gray-600">Loading materials...</p>
      ) : materials.length > 0 ? (
        <MaterialTable materials={materials} />
      ) : (
        <p className="text-gray-600">No materials found.</p>
      )}
    </div>
  );
}
