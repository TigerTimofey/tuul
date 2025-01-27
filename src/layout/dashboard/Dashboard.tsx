import { CircularProgress, Typography, Box } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";
import PairScooter from "../scooter/PairScooter";

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
        <Typography
          variant="h4"
          sx={{ fontFamily: "Ubuntu", fontWeight: "700" }}
        >
          Welcome, {user.email}!
        </Typography>
      </Box>
      <PairScooter />
    </div>
  );
};

export default Dashboard;
