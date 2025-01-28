import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface AuthErrorMessageProps {
  error: string | null;
  onClose: () => void;
  severity: "error" | "success";
}

const AuthErrorMessage: React.FC<AuthErrorMessageProps> = ({
  error,
  onClose,
  severity,
}) => {
  return (
    <Snackbar
      open={!!error}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={severity === "success" ? 3000 : null}
    >
      <Alert severity={severity} onClose={onClose}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default AuthErrorMessage;
