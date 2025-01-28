import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

interface CurrentCostProps {
  vehicleId?: string;
}

const CurrentCost: React.FC<CurrentCostProps> = ({ vehicleId }) => {
  const [cost, setCost] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("CurrentCost vehicleId:", vehicleId);

    if (!vehicleId) {
      console.log("No vehicleId provided");
      setError("No vehicle selected");
      return;
    }

    const fetchCost = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_FIREBASE_BACKEND_URL
          }/api/vehicles/${vehicleId}/current-cost`
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Cost fetch error:", errorText);
          throw new Error(`Failed to fetch cost data: ${errorText}`);
        }

        const data = await response.json();
        // console.log("Cost data received:", data);
        //TODO: Add sockets to update cost in real-time
        setCost(data.cost);
        setError(null);
      } catch (err: any) {
        console.error("Cost fetch error:", err);
        setError(err.message || "An error occurred while fetching the cost.");
      }
    };

    fetchCost();
    const intervalId = setInterval(fetchCost, 1000);

    return () => clearInterval(intervalId);
  }, [vehicleId]);

  if (!vehicleId) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Current Cost
        </Typography>
        <Typography>No vehicle selected</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Current Cost
      </Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : cost !== null ? (
        <Typography>
          <strong>{`$${cost.toFixed(2)}`}</strong>
        </Typography>
      ) : (
        <Typography>Fetching cost...</Typography>
      )}
    </Box>
  );
};

export default CurrentCost;
