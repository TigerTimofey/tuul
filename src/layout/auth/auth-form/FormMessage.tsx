import React from "react";
import { Alert } from "@mui/material";

interface FormMessageProps {
  message: { type: string; text: string };
  onClose: () => void;
}

const FormMessage: React.FC<FormMessageProps> = ({ message, onClose }) => {
  if (!message.text) return null;

  return (
    <Alert
      severity={
        message.type === "danger"
          ? "error"
          : (message.type as "success" | "info" | "warning" | "error")
      }
      sx={{
        marginBottom: 2,
        backgroundColor:
          message.type === "danger"
            ? "#f8d7da"
            : message.type === "success"
            ? "#a8f49d"
            : "transparent",
        color: message.type === "danger" ? "#721c24" : "inherit",
      }}
      onClose={onClose}
    >
      {message.text}
    </Alert>
  );
};

export default FormMessage;
