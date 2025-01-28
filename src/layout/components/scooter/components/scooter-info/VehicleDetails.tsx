import React, { useState, useEffect } from "react";
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
import TogglePowerButton from "./scooter-details/TogglePowerButton";
import ToggleLockButton from "./scooter-details/ToggleLockButton";

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
  id: string;
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
  const [isPoweredOn, setIsPoweredOn] = useState(vehicle.poweredOn);
  const [isLocked, setIsLocked] = useState(vehicle.locked);

  useEffect(() => {
    setIsLocked(vehicle.locked);
    setIsPoweredOn(vehicle.poweredOn);
  }, [vehicle.locked, vehicle.poweredOn]);

  const handleTogglePower = () => {
    setIsPoweredOn((prevState) => !prevState);
  };

  const handleToggleLock = () => {
    setIsLocked((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          // width: "300px",
          padding: 2,
          borderRadius: 3,
          backgroundColor: "var(--brand--white--color)",
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
          <VehicleDetailItem
            icon={<Build sx={{ color: "var(--brand--blue--color)", mr: 1 }} />}
            label="Vehicle Code"
            value={vehicle.vehicleCode}
          />

          <VehicleDetailItem
            icon={<Speed sx={{ color: "var(--brand--blue--color)", mr: 1 }} />}
            label="Status"
            value={vehicle.status}
          />

          <VehicleDetailItem
            icon={
              <BatteryFull
                sx={{ color: "var(--brand--green--color)", mr: 1 }}
              />
            }
            label="State of Charge"
            value={`${vehicle.stateOfCharge}%`}
          />

          <VehicleDetailItem
            icon={
              <LocationOn
                sx={{ color: "var(--brand--dark--green--color)", mr: 1 }}
              />
            }
            label="Latitude"
            value={vehicle.latitude}
          />

          <VehicleDetailItem
            icon={
              <LocationOn
                sx={{ color: "var(--brand--dark--green--color)", mr: 1 }}
              />
            }
            label="Longitude"
            value={vehicle.longitude}
          />

          <VehicleDetailItem
            icon={<Power sx={{ color: "var(--brand--green--color)", mr: 1 }} />}
            label="Powered On"
            value={isPoweredOn ? "Yes" : "No"}
          />

          <VehicleDetailItem
            icon={<Speed sx={{ color: "var(--brand--green--color)", mr: 1 }} />}
            label="Estimated Range"
            value={`${vehicle.estimatedRange} km`}
          />

          <VehicleDetailItem
            icon={<Speed sx={{ color: "var(--brand--green--color)", mr: 1 }} />}
            label="Odometer"
            value={`${vehicle.odometer} km`}
          />

          <VehicleDetailItem
            icon={<Lock sx={{ color: "var(--brand--orange--color)", mr: 1 }} />}
            label="Locked"
            value={isLocked ? "Yes" : "No"}
          />
        </Grid>

        <Box
          textAlign="center"
          mt={4}
          sx={{
            display: "flex",
            gap: 2,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <UnpairButton onClick={onUnpair} loading={unpairLoading} />
          <TogglePowerButton
            isPoweredOn={isPoweredOn}
            onToggle={handleTogglePower}
            vehicleId={vehicle.id}
            disabled={isLocked}
          />
          <ToggleLockButton
            isLocked={isLocked}
            onToggle={handleToggleLock}
            vehicleId={vehicle.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleDetails;
