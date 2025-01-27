import React from "react";
import axios from "axios";
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

interface LoginResponse {
  id: string;
  message: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isRegisterMode,
  onToggleMode,
}) => {
  const navigate = useNavigate();
  const {
    formData,
    error,
    handleInputChange,
    validateForm,
    setError,
    clearError,
  } = useAuthForm(isRegisterMode);

  const handleAuthAction = async () => {
    const { username, password } = formData;
    if (!validateForm()) return;

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, username, password);

        await axios.post(
          `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/api/users/register`,
          {
            email: username,
            password: password,
            name: "",
          }
        );
      } else {
        await signInWithEmailAndPassword(auth, username, password);
        // Log backend login response
        const loginResponse = await axios.post<LoginResponse>(
          `${import.meta.env.VITE_FIREBASE_BACKEND_URL}/api/users/login`,
          {
            email: username,
            password: password,
          }
        );
        console.log("Backend login response:", loginResponse.data);

        if (loginResponse.data.id) {
          localStorage.setItem("backendUserId", loginResponse.data.id);
        }
      }
      clearError();
      navigate("/dashboard");
    } catch (err: any) {
      setError("Failed to authenticate. Please check your Email or Password.");
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
      <AuthErrorMessage error={error} onClose={clearError} />
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
