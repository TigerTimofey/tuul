import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Divider,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Vehicle {
  id: string;
  vehicleCode: string;
  userId: string | null;
  paired: boolean;
  status: string;
  stateOfCharge: number;
  latitude: number;
  longitude: number;
  poweredOn: boolean;
  estimatedRange: number;
  odometer: number;
  locked: boolean;
}

interface UserVehicleInfoProps {
  userEmail: string;
}

const UserVehicleInfo: React.FC<UserVehicleInfoProps> = ({ userEmail }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [unpairLoading, setUnpairLoading] = useState<boolean>(false);

  const fetchUserByEmail = async (userEmail: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/by-email/${userEmail}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUserId(userData.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleUnpair = async () => {
    if (!vehicle) return;

    setUnpairLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/vehicles/${vehicle.id}/unpair`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unpair the scooter");
      }

      setVehicle(null); // Clear the vehicle data after successful unpairing
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUnpairLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserByEmail(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userId) {
      const fetchVehicleData = async () => {
        try {
          const userResponse = await fetch(
            `http://localhost:8080/api/users/${userId}`
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await userResponse.json();

          if (userData?.activeVehicleId) {
            const vehicleResponse = await fetch(
              `http://localhost:8080/api/vehicles/${userData.activeVehicleId}`
            );
            if (!vehicleResponse.ok) {
              throw new Error("Failed to fetch vehicle data");
            }
            const vehicleData = await vehicleResponse.json();
            setVehicle(vehicleData);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
          setLoading(false);
        }
      };

      fetchVehicleData();
    }
  }, [userId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">{`Error: ${error}`}</Typography>
      </Box>
    );
  }

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
                    <strong>Powered On:</strong>{" "}
                    {vehicle.poweredOn ? "Yes" : "No"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Estimated Range:</strong> {vehicle.estimatedRange}{" "}
                    km
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
                    onClick={handleUnpair}
                    disabled={unpairLoading}
                    sx={{ mt: 2 }}
                  >
                    {unpairLoading ? "Unpairing..." : "Unpair Scooter"}
                  </Button>
                </>
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
