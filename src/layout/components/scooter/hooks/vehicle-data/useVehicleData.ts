import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export interface Vehicle {
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

export const useVehicleData = () => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [unpairLoading, setUnpairLoading] = useState<boolean>(false);

  const setVehicleDirectly = (newVehicle: Vehicle | null) => {
    setVehicle(newVehicle);
    // Reset error state when setting new vehicle
    setError(null);
  };

  const fetchUserByEmail = async (email: string) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_FIREBASE_BACKEND_URL
        }/api/users/by-email/${email}`
      );

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const userData = await response.json();
      if (userData && userData.id) {
        setUserId(userData.id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchVehicleData = async (userId: string) => {
    try {
      const userResponse = await fetch(
        `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/api/users/${userId}`
      );
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await userResponse.json();

      if (userData?.activeVehicleId) {
        const vehicleResponse = await fetch(
          `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/api/vehicles/${
            userData.activeVehicleId
          }`
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
    if (!vehicle) return false;
    setUnpairLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const idToken = await user.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/api/vehicles/${
          vehicle.id
        }/unpair`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unpair the scooter");
      }

      // Clear vehicle state immediately
      setVehicleDirectly(null);

      // Refresh user data to ensure consistency
      if (user.email) {
        await fetchUserByEmail(user.email);
      }

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to unpair the scooter"
      );
      return false;
    } finally {
      setUnpairLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        fetchUserByEmail(user.email);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchVehicleData(userId);
    }
  }, [userId]);

  return {
    vehicle,
    loading,
    error,
    unpairLoading,
    handleUnpair,
    setVehicleDirectly,
  };
};
