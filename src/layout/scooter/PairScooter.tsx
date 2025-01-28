import React from "react";
import { Box, Typography, CardContent } from "@mui/material";
import PairingCodeInput from "./components/pairing/PairingCodeInput";
import ErrorAlert from "./hooks/error/ErrorAlert";
import PairButton from "./components/pairing/PairButton";
import { usePairScooter } from "./hooks/vehicle-data/usePairScooter";
import { Vehicle } from "./hooks/vehicle-data/useVehicleData";

interface PairScooterProps {
  onSuccess: (vehicleData: Vehicle) => void;
}

const PairScooter: React.FC<PairScooterProps> = ({ onSuccess }) => {
  const { pairingCode, setPairingCode, error, loading, handlePairScooter } =
    usePairScooter(onSuccess);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        py: 4,
        px: 2,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Pair Scooter
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          Enter the pairing code provided with your scooter to connect.
        </Typography>

        <PairingCodeInput
          value={pairingCode}
          onChange={(e) => setPairingCode(e.target.value)}
          disabled={loading}
        />

        {error && (
          <Box sx={{ mt: 2 }}>
            <ErrorAlert error={error} />
          </Box>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <PairButton
            onClick={handlePairScooter}
            disabled={loading || !pairingCode}
            loading={loading}
          />
        </Box>
      </CardContent>
    </Box>
  );
};

export default PairScooter;
