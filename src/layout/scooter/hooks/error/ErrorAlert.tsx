import { Alert } from "@mui/material";

interface ErrorAlertProps {
  error: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) =>
  error ? (
    <Alert severity="error" sx={{ my: 2 }}>
      {error}
    </Alert>
  ) : null;

export default ErrorAlert;
