import React from "react";
import { TextField } from "@mui/material";

interface AuthInputsProps {
  formData: {
    username: string;
    password: string;
    name?: string;
    lastname?: string;
  };
  isRegisterMode: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInputs: React.FC<AuthInputsProps> = ({
  formData,
  isRegisterMode,
  handleInputChange,
}) => {
  return (
    <div>
      {isRegisterMode && (
        <>
          <TextField
            name="name"
            label="First Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            name="lastname"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formData.lastname}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />
        </>
      )}
      <TextField
        name="username"
        label="Email"
        variant="outlined"
        fullWidth
        value={formData.username}
        onChange={handleInputChange}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={formData.password}
        onChange={handleInputChange}
        required
        sx={{ mb: 2 }}
      />
    </div>
  );
};

export default AuthInputs;
