import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

interface TogglePowerButtonProps {
  isPoweredOn: boolean;
  onToggle: () => void;
  vehicleId: string;
}

const TogglePowerButton: React.FC<TogglePowerButtonProps> = ({
  isPoweredOn,
  onToggle,
  vehicleId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    setLoading(true);

    try {
      const url = `${
        import.meta.env.VITE_FIREBASE_BACKEND_URL
      }/api/vehicles/${vehicleId}/power?on=${!isPoweredOn}`;

      const response = await axios.post(url);
      console.log("Toggle Power Response:", response.data);

      onToggle();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleToggle}
        disabled={loading}
        sx={{
          backgroundColor: isPoweredOn
            ? "var(--brand--green--color)"
            : "var(--brand--red--color)",
          color: "var(--brand--white--color)",
          fontWeight: "bold",
          padding: "12px 24px",
          borderRadius: 3,
          textTransform: "capitalize",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s, transform 0.2s ease",
          "&:hover": {
            backgroundColor: "var(--brand--hover--color)",
          },
        }}
      >
        {loading ? "Loading..." : isPoweredOn ? "ON" : "OFF"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
    </div>
  );
};

export default TogglePowerButton;
