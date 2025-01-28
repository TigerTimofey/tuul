import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RefreshIcon from "@mui/icons-material/Refresh";
import useLocation from "../../../hooks/useLocation";

const LocationInfo: React.FC = () => {
  const { latitude, longitude, fetchLocation, error } = useLocation();

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid gridColumn="span 12" gridRow="span 6">
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <LocationOnIcon
                sx={{
                  fontSize: 40,
                  color: "var(--brand--blue--color)",
                }}
              />

              <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
                Current Location
              </Typography>

              {error ? (
                <Typography
                  color="error"
                  sx={{
                    p: 2,
                    bgcolor: "error.light",
                    borderRadius: 1,
                    color: "error.dark",
                  }}
                >
                  {error}
                </Typography>
              ) : latitude && longitude ? (
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Latitude:{" "}
                    <Typography component="span" fontWeight="bold">
                      {latitude}°
                    </Typography>
                  </Typography>
                  <Typography variant="body1">
                    Longitude:{" "}
                    <Typography component="span" fontWeight="bold">
                      {longitude}°
                    </Typography>
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CircularProgress size={20} />
                  <Typography>Determining your location...</Typography>
                </Box>
              )}

              <Button
                variant="contained"
                onClick={fetchLocation}
                startIcon={<RefreshIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                Refresh Location
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LocationInfo;
