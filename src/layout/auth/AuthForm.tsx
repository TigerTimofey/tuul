import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthInputs from "./auth-form/AuthInputs";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthErrorMessage from "./auth-form/AuthErrorMessage";
import useAuthForm from "../../hooks/useAuthForm";
import AuthToggleLink from "./auth-form/AuthToggleLink";

interface AuthFormProps {
  isRegisterMode: boolean;
  onToggleMode: () => void;
}

interface MessageState {
  text: string | null;
  severity: "error" | "success";
}

const AuthForm: React.FC<AuthFormProps> = ({
  isRegisterMode,
  onToggleMode,
}) => {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    error,
    handleInputChange,
    validateForm,
    clearError,
  } = useAuthForm(isRegisterMode);

  const [message, setMessage] = useState<MessageState>({
    text: null,
    severity: "error",
  });

  useEffect(() => {
    setFormData({ username: "", password: "" });
    setMessage({ text: null, severity: "error" });
    clearError();
  }, [isRegisterMode]);

  const handleAuthAction = async () => {
    const { username, password } = formData;
    if (!validateForm()) return;

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, username, password);

        setFormData({ username: "", password: "" });
        clearError();

        setMessage({
          text: "Registration successful! You can now login.",
          severity: "success",
        });
      } else {
        await signInWithEmailAndPassword(auth, username, password);
        clearError();
        navigate("/dashboard");
      }
    } catch (err: any) {
      setMessage({
        text: "Please check your Email or Password.",
        severity: "error",
      });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: "center",
          fontFamily: "Ubuntu",
          fontWeight: "700",
        }}
      >
        {isRegisterMode ? "Register" : "Login"}
      </Typography>
      <AuthInputs
        formData={formData}
        handleInputChange={handleInputChange}
        isRegisterMode={false}
      />
      <AuthErrorMessage
        error={message.text || error}
        onClose={() => {
          setMessage({ text: null, severity: "error" });
          clearError();
        }}
        severity={error ? "error" : message.severity}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAuthAction}
        sx={{ mt: 2, mb: 1 }}
      >
        {isRegisterMode ? "Sign Up" : "Sign In"}
      </Button>
      <AuthToggleLink
        isRegisterMode={isRegisterMode}
        onToggleMode={onToggleMode}
      />
    </div>
  );
};

export default AuthForm;
