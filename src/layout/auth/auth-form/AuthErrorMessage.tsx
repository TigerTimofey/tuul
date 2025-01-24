import React from "react";
import { Typography } from "@mui/material";

interface AuthErrorMessageProps {
  error: string | null;
}

const AuthErrorMessage: React.FC<AuthErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  return (
    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
      {error}
    </Typography>
  );
};

export default AuthErrorMessage;
