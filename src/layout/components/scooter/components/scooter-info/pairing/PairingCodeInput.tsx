import { TextField } from "@mui/material";

interface PairingCodeInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const PairingCodeInput: React.FC<PairingCodeInputProps> = ({
  value,
  onChange,
  disabled,
}) => (
  <TextField
    fullWidth
    value={value}
    onChange={onChange}
    placeholder="Enter scooter code"
    margin="normal"
    disabled={disabled}
  />
);

export default PairingCodeInput;
