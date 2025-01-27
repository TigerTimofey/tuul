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

const PairScooter = () => {
  const [pairingCode, setPairingCode] = useState("");
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePairScooter = async () => {
    if (!pairingCode) {
      setStatus({ message: "Please enter a pairing code", type: "error" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Please log in first");
      }

      // Get Firebase ID token
      const idToken = await user.getIdToken();

      const payload = {
        vehicleCode: pairingCode,
        userId: user.uid,
      };

      console.log("Sending request to backend:", {
        url: `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/api/vehicles/pair`,
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: payload,
      });

      interface PairResponse {
        vehicleId: string;
        message?: string;
      }

      const response = await axios.post<PairResponse>(
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
        setStatus({
          message: response.data.message || "Scooter paired successfully!",
          type: "success",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      setStatus({
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to pair scooter",
        type: "error",
      });
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

      {status && (
        <Alert severity={status.type} sx={{ my: 2 }}>
          {status.message}
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
