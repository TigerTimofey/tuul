import { CircularProgress, Typography, Box } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import UserVehicleInfo from "../scooter/UserVehicleInfo";
import Grid from "@mui/material/Grid2";
import LocationInfo from "../location/LocationInfo";

const Dashboard = () => {
  const { user, loading } = useAuth();

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
            <UserVehicleInfo />{" "}
          </Grid>
          <Grid gridColumn="span 12" gridRow="span 6">
            <LocationInfo />{" "}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
