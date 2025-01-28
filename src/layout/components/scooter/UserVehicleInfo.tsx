import React, { useState } from "react";
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

interface UserVehicleInfoProps {
  onPairingSuccess: (vehicle: Vehicle | null) => void;
}

const UserVehicleInfo: React.FC<UserVehicleInfoProps> = ({
  onPairingSuccess,
}) => {
  const [pairedVehicle, setPairedVehicle] = useState<Vehicle | null>(null);
  const { vehicle, loading, error, unpairLoading, handleUnpair } =
    useVehicleData();

  const handleSuccess = (newVehicle: Vehicle) => {
    setPairedVehicle(newVehicle);
    onPairingSuccess(newVehicle);
  };

  const handleUnpairSuccess = async () => {
    await handleUnpair();
    setPairedVehicle(null);
    onPairingSuccess(null);
  };

  const activeVehicle = pairedVehicle || vehicle;

  return (
    <Box sx={{ padding: 1 }}>
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
              <Divider sx={{ marginY: 1 }} />

              {error && (
                <Box sx={{ marginBottom: 1 }}>
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
              ) : activeVehicle ? (
                <VehicleDetails
                  vehicle={activeVehicle}
                  onUnpair={handleUnpairSuccess}
                  unpairLoading={unpairLoading}
                />
              ) : (
                <PairScooter onSuccess={handleSuccess} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserVehicleInfo;
