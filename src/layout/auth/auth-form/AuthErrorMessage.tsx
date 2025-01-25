import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface AuthErrorMessageProps {
  error: string | null;
  onClose: () => void;
}

const AuthErrorMessage: React.FC<AuthErrorMessageProps> = ({
  error,
  onClose,
}) => {
  return (
    <Snackbar
      open={!!error}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity="error" onClose={onClose}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default AuthErrorMessage;
