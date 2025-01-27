// PairScooter.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import PairingCodeInput from "./components/pairing/PairingCodeInput";
import ErrorAlert from "./hooks/error/ErrorAlert";
import PairButton from "./components/pairing/PairButton";
import { usePairScooter } from "./hooks/vehicle-data/usePairScooter";

interface PairScooterProps {
  onSuccess: (vehicleId: string) => void;
}

const PairScooter: React.FC<PairScooterProps> = ({ onSuccess }) => {
  const { pairingCode, setPairingCode, error, loading, handlePairScooter } =
    usePairScooter(onSuccess);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Pair Your Scooter
      </Typography>

      <PairingCodeInput
        value={pairingCode}
        onChange={(e) => setPairingCode(e.target.value)}
        disabled={loading}
      />

      <ErrorAlert error={error} />

      <PairButton
        onClick={handlePairScooter}
        disabled={loading || !pairingCode}
        loading={loading}
      />
    </Box>
  );
};

export default PairScooter;
