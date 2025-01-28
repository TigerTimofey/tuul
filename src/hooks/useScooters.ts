import { useState, useEffect } from "react";

interface Scooter {
  id: string;
  vehicleCode: string;
  latitude: number;
  longitude: number;
  status: string;
  stateOfCharge: number;
}

export const useScooters = () => {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScooters = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/vehicles/all");
      if (!response.ok) throw new Error("Failed to fetch scooters");
      const data = await response.json();
      setScooters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch scooters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScooters();
  }, []);

  return { scooters, loading, error, refreshScooters: fetchScooters };
};
