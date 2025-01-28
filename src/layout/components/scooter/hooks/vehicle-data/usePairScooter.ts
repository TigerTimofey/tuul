import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { Vehicle } from "./useVehicleData";

interface UsePairScooterReturn {
  pairingCode: string;
  setPairingCode: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  loading: boolean;
  handlePairScooter: () => Promise<void>;
}

export const usePairScooter = (
  onSuccess: (vehicleData: Vehicle) => void
): UsePairScooterReturn => {
  const [pairingCode, setPairingCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePairScooter = async () => {
    if (!pairingCode) {
      setError("Please enter a pairing code");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Please log in first");
      }

      const idToken = await user.getIdToken();

      const payload = {
        vehicleCode: pairingCode,
        userId: user.uid,
      };

      const response = await axios.post<Vehicle>(
        `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/api/vehicles/pair`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
        }
      );

      if (response.data) {
        onSuccess(response.data);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to pair scooter"
      );
    } finally {
      setLoading(false);
    }
  };

  return { pairingCode, setPairingCode, error, loading, handlePairScooter };
};
