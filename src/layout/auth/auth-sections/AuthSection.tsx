import React, { useState } from "react";
import { Box } from "@mui/material";
import "animate.css";
import AuthForm from "../AuthForm";

interface AuthSectionProps {
  isRegisterMode: boolean;
  onToggleMode: () => void;
  onFormSubmit: (formData: { username: string; password: string }) => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({
  isRegisterMode,
  onToggleMode,
  onFormSubmit,
}) => {
  const [animationClass, setAnimationClass] = useState(
    "animate__animated animate__fadeIn"
  );

  const handleToggleMode = () => {
    setAnimationClass("animate__animated animate__fadeOut");
    setTimeout(() => {
      onToggleMode();
      setAnimationClass("animate__animated animate__fadeIn");
    }, 500);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--brand--white--color)",
      }}
    >
      <div className={animationClass}>
        <AuthForm
          onFormSubmit={onFormSubmit}
          isRegisterMode={isRegisterMode}
          onToggleMode={handleToggleMode}
        />
      </div>
    </Box>
  );
};

export default AuthSection;
