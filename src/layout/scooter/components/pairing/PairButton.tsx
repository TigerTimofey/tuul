import { Button, CircularProgress } from "@mui/material";

interface PairButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

const PairButton: React.FC<PairButtonProps> = ({
  onClick,
  disabled,
  loading,
}) => (
  <Button
    fullWidth
    variant="contained"
    onClick={onClick}
    disabled={disabled}
    sx={{ mt: 2 }}
  >
    {loading ? (
      <>
        <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
        Pairing...
      </>
    ) : (
      "Pair Scooter"
    )}
  </Button>
);

export default PairButton;
