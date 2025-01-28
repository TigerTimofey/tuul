import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import VehicleDetails from "./components/scooter-info/VehicleDetails";
import { useVehicleData, Vehicle } from "./hooks/vehicle-data/useVehicleData";
import ErrorAlert from "./hooks/error/ErrorAlert";
import PairScooter from "./PairScooter";

const UserVehicleInfo: React.FC = () => {
  const {
    vehicle,
    loading,
    error,
    unpairLoading,
    handleUnpair,
    setVehicleDirectly,
  } = useVehicleData();

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid gridColumn="span 12" gridRow="span 6">
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                🛴 Vehicle Information
              </Typography>
              <Divider sx={{ marginY: 2 }} />

              {error && (
                <Box sx={{ marginBottom: 2 }}>
                  <ErrorAlert error={error} />
                </Box>
              )}

              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "150px",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : vehicle ? (
                <VehicleDetails
                  vehicle={vehicle}
                  onUnpair={handleUnpair}
                  unpairLoading={unpairLoading}
                />
              ) : (
                <PairScooter
                  onSuccess={(vehicle: Vehicle) => {
                    setVehicleDirectly(vehicle);
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserVehicleInfo;
