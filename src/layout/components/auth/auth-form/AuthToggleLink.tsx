import React from "react";
import { Typography } from "@mui/material";

interface AuthToggleLinkProps {
  isRegisterMode: boolean;
  onToggleMode: () => void;
}

const AuthToggleLink: React.FC<AuthToggleLinkProps> = ({
  isRegisterMode,
  onToggleMode,
}) => {
  return (
    <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
      {isRegisterMode ? (
        <>
          Already have an account?{" "}
          <span
            onClick={onToggleMode}
            style={{ color: "#1A73E8", cursor: "pointer" }}
          >
            Login
          </span>
        </>
      ) : (
        <>
          Don't have an account?{" "}
          <span
            onClick={onToggleMode}
            style={{ color: "#1A73E8", cursor: "pointer" }}
          >
            Create Account
          </span>
        </>
      )}
    </Typography>
  );
};

export default AuthToggleLink;
