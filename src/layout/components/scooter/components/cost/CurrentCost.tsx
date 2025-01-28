import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";

interface CurrentCostProps {
  vehicleId?: string;
}

const CurrentCost: React.FC<CurrentCostProps> = ({ vehicleId }) => {
  const [cost, setCost] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) {
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

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        backgroundColor: "var(--brand--green--color)",

        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        borderBottom: "2px solid var(--brand--gray--color)",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease-in-out",
        "@media (max-width: 600px)": {
          bottom: 0,
          left: 0,
          flexDirection: "row",
          padding: "8px 16px",
          justifyContent: "center",
        },
        "@media (min-width: 601px)": {
          bottom: 0,
          left: 0,
          flexDirection: "row",
          justifyContent: "center",
        },
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {error ? (
          <Typography
            variant="h6"
            sx={{
              color: "var(--brand--dark--green--color)",
              fontWeight: "bold",
            }}
          >
            {error}
          </Typography>
        ) : cost !== null ? (
          <>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                color: "var(--brand--dark--green--color)",
                marginRight: "16px",
                "@media (max-width: 600px)": {
                  marginRight: "8px",
                },
              }}
            >
              Ride Cost
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "var(--brand--dark--green--color)",
                fontWeight: "bold",
              }}
            >
              {`${cost.toFixed(2)} €`}
            </Typography>
          </>
        ) : (
          <CircularProgress sx={{ color: "var(--brand--blue--color)" }} />
        )}
      </Box>
    </Box>
  );
};

export default CurrentCost;
