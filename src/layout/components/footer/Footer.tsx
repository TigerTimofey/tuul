import { CircularProgress, Box, Typography } from "@mui/material";
import CurrentCost from "../scooter/components/cost/CurrentCost";

interface FooterProps {
  vehicleLoading: boolean;
  vehicleId: string | undefined;
}

const Footer = ({ vehicleLoading, vehicleId }: FooterProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "var(--brand--green--color)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        borderTop: "2px solid var(--brand--gray--color)",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "@media (max-width: 600px)": {
          padding: "8px 16px",
        },
      }}
    >
      {vehicleLoading ? (
        <CircularProgress />
      ) : vehicleId ? (
        <CurrentCost vehicleId={vehicleId} />
      ) : (
        <Typography
          variant="h6"
          sx={{
            color: "var(--brand--dark--green--color)",
            fontWeight: "bold",
          }}
        >
          No vehicle selected
        </Typography>
      )}
    </Box>
  );
};

export default Footer;
