import React, { useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import "animate.css";
import AuthInputs from "./auth-form/AuthInputs";
import AuthActions from "./auth-form/AuthActions";
import FormMessage from "./auth-form/FormMessage";

interface AuthFormProps {
  onFormSubmit: (formData: {
    username: string;
    password: string;
    name?: string;
    lastname?: string;
  }) => void;
  isRegisterMode: boolean;
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onFormSubmit,
  isRegisterMode,
  onToggleMode,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    lastname: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.username ||
      !formData.password ||
      (isRegisterMode && (!formData.name || !formData.lastname))
    ) {
      setMessage({
        type: "danger",
        text: "Please fill in all required fields.",
      });
      return;
    }

    onFormSubmit(formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: { xs: 2 },
      }}
    >
      <Card
        sx={{
          padding: 5,
          width: { sm: 400 },
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          backgroundColor: "#f0efef",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            textAlign: "center",
            color: "var(  --brand--dark--green--color)",
            marginBottom: 3,
            fontWeight: 600,
          }}
        >
          {isRegisterMode ? "Register" : "Login"}
        </Typography>

        <FormMessage
          message={message}
          onClose={() => setMessage({ type: "", text: "" })}
        />
        <AuthInputs
          formData={formData}
          isRegisterMode={isRegisterMode}
          handleInputChange={handleInputChange}
        />
        <AuthActions
          isRegisterMode={isRegisterMode}
          handleSubmit={handleSubmit}
          onToggleMode={onToggleMode}
        />
      </Card>
    </Box>
  );
};

export default AuthForm;
