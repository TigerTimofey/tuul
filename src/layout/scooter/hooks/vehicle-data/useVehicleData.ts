import { useState, useEffect } from "react";

interface Vehicle {
  id: string;
  vehicleCode: string;
  userId: string | null;
  paired: boolean;
  status: string;
  stateOfCharge: number;
  latitude: number;
  longitude: number;
  poweredOn: boolean;
  estimatedRange: number;
  odometer: number;
  locked: boolean;
}

export const useVehicleData = (userEmail: string) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [unpairLoading, setUnpairLoading] = useState<boolean>(false);

  const fetchUserByEmail = async (email: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/by-email/${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUserId(userData.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const fetchVehicleData = async (userId: string) => {
    try {
      const userResponse = await fetch(
        `http://localhost:8080/api/users/${userId}`
      );
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await userResponse.json();

      if (userData?.activeVehicleId) {
        const vehicleResponse = await fetch(
          `http://localhost:8080/api/vehicles/${userData.activeVehicleId}`
        );
        if (!vehicleResponse.ok) {
          throw new Error("Failed to fetch vehicle data");
        }
        const vehicleData = await vehicleResponse.json();
        setVehicle(vehicleData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUnpair = async () => {
    if (!vehicle) return;
    setUnpairLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/vehicles/${vehicle.id}/unpair`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Failed to unpair the scooter");
      }

      setVehicle(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUnpairLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserByEmail(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userId) {
      fetchVehicleData(userId);
    }
  }, [userId]);

  return { vehicle, loading, error, unpairLoading, handleUnpair };
};
