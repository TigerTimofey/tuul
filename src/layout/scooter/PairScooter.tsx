import { useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

interface PairScooterProps {
  onSuccess: (vehicleId: string) => void;
}

const PairScooter: React.FC<PairScooterProps> = ({ onSuccess }) => {
  const [pairingCode, setPairingCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePairScooter = async () => {
    if (!pairingCode) {
      setError("Please enter a pairing code");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Please log in first");
      }

      const idToken = await user.getIdToken();

      const payload = {
        vehicleCode: pairingCode,
        userId: user.uid,
      };

      const response = await axios.post<{ vehicleId: string }>(
        `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/api/vehicles/pair`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
        }
      );

      if (response.data && response.data.vehicleId) {
        onSuccess(response.data.vehicleId);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to pair scooter"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Pair Your Scooter
      </Typography>

      <TextField
        fullWidth
        value={pairingCode}
        onChange={(e) => setPairingCode(e.target.value)}
        placeholder="Enter scooter code"
        margin="normal"
        disabled={loading}
      />

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={handlePairScooter}
        disabled={loading || !pairingCode}
        sx={{ mt: 2 }}
      >
        {loading ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
            Pairing...
          </>
        ) : (
          "Pair Scooter"
        )}
      </Button>
    </Box>
  );
};

export default PairScooter;
