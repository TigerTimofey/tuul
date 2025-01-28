import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
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
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid gridColumn="span 12" gridRow="span 6">
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Vehicle Information
              </Typography>
              <Divider />
              {error && <ErrorAlert error={error} />}
              {vehicle ? (
                <VehicleDetails
                  vehicle={vehicle}
                  onUnpair={handleUnpair}
                  unpairLoading={unpairLoading}
                />
              ) : (
                <>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                  >
                    {loading
                      ? "Loading vehicle information..."
                      : "No active vehicle found. You can pair a new scooter below."}
                  </Typography>
                  <PairScooter
                    onSuccess={(vehicle: Vehicle) => {
                      setVehicleDirectly(vehicle);
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserVehicleInfo;
