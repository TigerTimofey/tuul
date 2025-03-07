import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
