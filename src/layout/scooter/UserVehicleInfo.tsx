import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import VehicleDetails from "./components/scooter-info/VehicleDetails";

import { useVehicleData } from "./hooks/vehicle-data/useVehicleData";
import ErrorAlert from "./hooks/error/ErrorAlert";

interface UserVehicleInfoProps {
  userEmail: string;
}

const UserVehicleInfo: React.FC<UserVehicleInfoProps> = ({ userEmail }) => {
  const { vehicle, loading, error, unpairLoading, handleUnpair } =
    useVehicleData(userEmail);

  if (loading && !vehicle) return null;
  if (error) return <ErrorAlert error={error} />;

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
              {vehicle ? (
                <VehicleDetails
                  vehicle={vehicle}
                  onUnpair={handleUnpair}
                  unpairLoading={unpairLoading}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No active vehicle found.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserVehicleInfo;
