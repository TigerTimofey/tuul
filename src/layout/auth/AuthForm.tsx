import React from "react";
import { Button, Typography } from "@mui/material";
import AuthInputs from "./auth-form/AuthInputs";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AuthErrorMessage from "./auth-form/AuthErrorMessage";
import useAuthForm from "./auth-form/hooks/useAuthForm";
import AuthToggleLink from "./auth-form/AuthToggleLink";

interface AuthFormProps {
  isRegisterMode: boolean;
  onToggleMode: () => void;
  onFormSubmit: (formData: { username: string; password: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onFormSubmit,
  isRegisterMode,
  onToggleMode,
}) => {
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
      } else {
        await signInWithEmailAndPassword(auth, username, password);
      }
      clearError();
      onFormSubmit({ username, password });
    } catch (err: any) {
      setError("Failed to authenticate. Please check your Email or Password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
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
      <AuthErrorMessage error={error} />
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
