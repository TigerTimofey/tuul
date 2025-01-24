import React, { useState } from "react";
import { Box } from "@mui/material";
import ImageSection from "./auth-sections/ImageSection";
import AuthSection from "./auth-sections/AuthSection";

const AuthenticationPage: React.FC = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleToggleMode = () => {
    setIsRegisterMode((prev) => !prev);
  };

  const handleFormSubmit = (formData: {
    username: string;
    password: string;
    name?: string;
    lastname?: string;
  }) => {
    console.log(formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <ImageSection isRegisterMode={isRegisterMode} />
      <AuthSection
        isRegisterMode={isRegisterMode}
        onToggleMode={handleToggleMode}
        onFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default AuthenticationPage;
