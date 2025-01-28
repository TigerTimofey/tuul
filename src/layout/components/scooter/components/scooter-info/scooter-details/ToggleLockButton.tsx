import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { Lock, LockOpen } from "@mui/icons-material";

interface ToggleLockButtonProps {
  isLocked: boolean;
  onToggle: () => void;
  vehicleId: string;
}

const ToggleLockButton: React.FC<ToggleLockButtonProps> = ({
  isLocked,
  onToggle,
  vehicleId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    setLoading(true);

    try {
      await axios.post(
        `${
          import.meta.env.VITE_FIREBASE_BACKEND_URL
        }/api/vehicles/${vehicleId}/lock?lock=${!isLocked}`
      );
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
        startIcon={isLocked ? <Lock /> : <LockOpen />}
        sx={{
          width: "120px",
          backgroundColor: isLocked
            ? "var(--brand--orange--color)"
            : "var(--brand--green--color)",
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
        {loading ? (
          <CircularProgress
            size={24}
            sx={{ color: "var(--brand--white--color)" }}
          />
        ) : isLocked ? (
          "Locked"
        ) : (
          "Unlocked"
        )}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ToggleLockButton;
