import React, { useEffect } from "react";
import { Box, Typography, CardContent } from "@mui/material";
import PairingCodeInput from "./components/scooter-info/pairing/PairingCodeInput";
import ErrorAlert from "./hooks/error/ErrorAlert";
import PairButton from "./components/scooter-info/pairing/PairButton";
import { usePairScooter } from "./hooks/vehicle-data/usePairScooter";
import { Vehicle } from "./hooks/vehicle-data/useVehicleData";
import { usePairing } from "../../../context/PairingContext";

interface PairScooterProps {
  onSuccess: (vehicleData: Vehicle) => void;
}

const PairScooter: React.FC<PairScooterProps> = ({ onSuccess }) => {
  const { selectedCode } = usePairing();
  const { pairingCode, setPairingCode, error, loading, handlePairScooter } =
    usePairScooter(onSuccess);

  // Update pairingCode when selectedCode changes
  useEffect(() => {
    if (selectedCode) {
      setPairingCode(selectedCode);
    }
  }, [selectedCode, setPairingCode]);

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        py: 1,
        px: 2,
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 1,
          }}
        >
          Pair Scooter
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            textAlign: "center",
            marginBottom: 1,
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

        <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
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
