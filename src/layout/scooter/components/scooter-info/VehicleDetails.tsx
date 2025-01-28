import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  Lock,
  LocationOn,
  BatteryFull,
  Speed,
  Power,
  Build,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import VehicleDetailItem from "./scooter-details/VehicleDetailItem";
import UnpairButton from "./scooter-details/UnpairButton";

interface Vehicle {
  vehicleCode: string;
  status: string;
  stateOfCharge: number;
  latitude: number;
  longitude: number;
  poweredOn: boolean;
  estimatedRange: number;
  odometer: number;
  locked: boolean;
}

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onUnpair: () => void;
  unpairLoading: boolean;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
  vehicle,
  onUnpair,
  unpairLoading,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "300px",
          padding: 2,
          borderRadius: 3,
          backgroundColor: "var(--brand--white--color)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
            color: "var(--brand--blue--color)",
          }}
        >
          Scooter Details
        </Typography>

        <Grid container columns={12} spacing={4}>
          {/* Vehicle Code */}
          <VehicleDetailItem
            icon={<Build sx={{ color: "var(--brand--blue--color)", mr: 1 }} />}
            label="Vehicle Code"
            value={vehicle.vehicleCode}
          />

          {/* Status */}
          <VehicleDetailItem
            icon={<Speed sx={{ color: "var(--brand--blue--color)", mr: 1 }} />}
            label="Status"
            value={vehicle.status}
          />

          {/* State of Charge */}
          <VehicleDetailItem
            icon={
              <BatteryFull
                sx={{ color: "var(--brand--green--color)", mr: 1 }}
              />
            }
            label="State of Charge"
            value={`${vehicle.stateOfCharge}%`}
          />

          {/* Latitude */}
          <VehicleDetailItem
            icon={
              <LocationOn
                sx={{ color: "var(--brand--dark--green--color)", mr: 1 }}
              />
            }
            label="Latitude"
            value={vehicle.latitude}
          />

          {/* Longitude */}
          <VehicleDetailItem
            icon={
              <LocationOn
                sx={{ color: "var(--brand--dark--green--color)", mr: 1 }}
              />
            }
            label="Longitude"
            value={vehicle.longitude}
          />

          {/* Powered On */}
          <VehicleDetailItem
            icon={<Power sx={{ color: "var(--brand--green--color)", mr: 1 }} />}
            label="Powered On"
            value={vehicle.poweredOn ? "Yes" : "No"}
          />

          {/* Estimated Range */}
          <VehicleDetailItem
            icon={<Speed sx={{ color: "var(--brand--green--color)", mr: 1 }} />}
            label="Estimated Range"
            value={`${vehicle.estimatedRange} km`}
          />

          {/* Odometer */}
          <VehicleDetailItem
            icon={<Speed sx={{ color: "var(--brand--green--color)", mr: 1 }} />}
            label="Odometer"
            value={`${vehicle.odometer} km`}
          />

          {/* Locked */}
          <VehicleDetailItem
            icon={<Lock sx={{ color: "var(--brand--orange--color)", mr: 1 }} />}
            label="Locked"
            value={vehicle.locked ? "Yes" : "No"}
          />
        </Grid>

        {/* Unpair Button */}
        <Box textAlign="center" mt={4}>
          <UnpairButton onClick={onUnpair} loading={unpairLoading} />
        </Box>
      </Paper>
    </Box>
  );
};

export default VehicleDetails;
