import React, { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import useLocation from "../../../hooks/useLocation";

const LocationInfo: React.FC = () => {
  const { latitude, longitude, fetchLocation, error } = useLocation();

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <Box sx={{ mt: 2, textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Current Location
      </Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : latitude && longitude ? (
        <Typography>
          Latitude: <strong>{latitude}</strong>, Longitude:{" "}
          <strong>{longitude}</strong>
        </Typography>
      ) : (
        <Typography>Fetching location...</Typography>
      )}
      <Button
        variant="contained"
        onClick={fetchLocation}
        sx={{
          mt: 2,
          textTransform: "capitalize",
          backgroundColor: "var(--brand--blue--color)",
          color: "white",
        }}
      >
        Refresh Location
      </Button>
    </Box>
  );
};

export default LocationInfo;
