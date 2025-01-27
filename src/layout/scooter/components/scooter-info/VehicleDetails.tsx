import React from "react";
import { Typography, Button } from "@mui/material";

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
    <>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        <strong>Vehicle Code:</strong> {vehicle.vehicleCode}
      </Typography>
      <Typography variant="body1">
        <strong>Status:</strong> {vehicle.status}
      </Typography>
      <Typography variant="body1">
        <strong>State of Charge:</strong> {vehicle.stateOfCharge}%
      </Typography>
      <Typography variant="body1">
        <strong>Latitude:</strong> {vehicle.latitude}
      </Typography>
      <Typography variant="body1">
        <strong>Longitude:</strong> {vehicle.longitude}
      </Typography>
      <Typography variant="body1">
        <strong>Powered On:</strong> {vehicle.poweredOn ? "Yes" : "No"}
      </Typography>
      <Typography variant="body1">
        <strong>Estimated Range:</strong> {vehicle.estimatedRange} km
      </Typography>
      <Typography variant="body1">
        <strong>Odometer:</strong> {vehicle.odometer} km
      </Typography>
      <Typography variant="body1">
        <strong>Locked:</strong> {vehicle.locked ? "Yes" : "No"}
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={onUnpair}
        disabled={unpairLoading}
        sx={{ mt: 2 }}
      >
        {unpairLoading ? "Unpairing..." : "Unpair Scooter"}
      </Button>
    </>
  );
};

export default VehicleDetails;
