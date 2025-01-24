import React from "react";
import { Box } from "@mui/material";
import loginPng from "../../../assets/images/login.png";
import regPng from "../../../assets/images/register.png";
import logo from "../../../assets/images/logo.png";

interface ImageSectionProps {
  isRegisterMode: boolean;
}

const ImageSection: React.FC<ImageSectionProps> = ({ isRegisterMode }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: "none", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--brand--green--color)",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={isRegisterMode ? regPng : loginPng}
        alt={isRegisterMode ? "Register" : "Login"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            maxWidth: "150px",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default ImageSection;
