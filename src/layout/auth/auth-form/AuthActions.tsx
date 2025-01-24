import React from "react";
import { Button, Typography } from "@mui/material";

interface AuthActionsProps {
  isRegisterMode: boolean;
  handleSubmit: () => void;
  onToggleMode: () => void;
}

const AuthActions: React.FC<AuthActionsProps> = ({
  isRegisterMode,
  handleSubmit,
  onToggleMode,
}) => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{
          backgroundColor: "var(--brand--blue--color)",
          color: "var(--brand--white--color)",
          "&:hover": {
            backgroundColor: "var(--brand--blue--hover--color)",
          },
          fontWeight: 600,
          fontSize: "1rem",
          mt: 2,
          mb: 1,
        }}
        fullWidth
        onClick={handleSubmit}
      >
        {isRegisterMode ? "Sign Up" : "Sign In"}
      </Button>

      <Typography variant="body2" sx={{ textAlign: "center" }}>
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
    </div>
  );
};

export default AuthActions;
