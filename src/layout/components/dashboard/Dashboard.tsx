import { CircularProgress, Typography, Box } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import UserVehicleInfo from "../scooter/UserVehicleInfo";
import Grid from "@mui/material/Grid2";
import LocationInfo from "../location/LocationInfo";
import CurrentCost from "../scooter/components/cost/CurrentCost";
import { useVehicleData } from "../scooter/hooks/vehicle-data/useVehicleData";
import { useState, useEffect } from "react";
import { Vehicle } from "../scooter/hooks/vehicle-data/useVehicleData";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const {
    vehicle,
    loading: vehicleLoading,
    setVehicleDirectly,
  } = useVehicleData();
  const [currentVehicle, setCurrentVehicle] = useState(vehicle);

  useEffect(() => {
    setCurrentVehicle(vehicle);
  }, [vehicle]);

  const handlePairingSuccess = (newVehicle: Vehicle | null) => {
    setCurrentVehicle(newVehicle);
    setVehicleDirectly(newVehicle);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
        Unauthorized. Please log in.
      </Typography>
    );
  }

  return (
    <div>
      <Navbar userEmail={user.email} />
      <Box sx={{ mt: 4, textAlign: "center" }}>
        {" "}
        <Grid container spacing={4} justifyContent="center">
          <Grid gridColumn="span 12" gridRow="span 6">
            <UserVehicleInfo onPairingSuccess={handlePairingSuccess} />{" "}
          </Grid>
          <Grid gridColumn="span 12" gridRow="span 6">
            <LocationInfo />{" "}
          </Grid>
          <Grid gridColumn="span 12" gridRow="span 6">
            {vehicleLoading ? (
              <CircularProgress />
            ) : (
              <CurrentCost vehicleId={currentVehicle?.id} />
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
