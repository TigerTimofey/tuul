import { useState } from "react";

const useAuthForm = (_isRegisterMode: boolean) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { username, password } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username || !password) {
      setError("Email and Password are required");
      return false;
    }
    if (!emailRegex.test(username)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const clearError = () => setError(null);

  return {
    formData,
    error,
    handleInputChange,
    validateForm,
    setError,
    clearError,
  };
};

export default useAuthForm;
