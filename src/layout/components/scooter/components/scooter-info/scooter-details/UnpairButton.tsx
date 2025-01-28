import React from "react";
import { Button } from "@mui/material";

interface UnpairButtonProps {
  onClick: () => void;
  loading: boolean;
}

const UnpairButton: React.FC<UnpairButtonProps> = ({ onClick, loading }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={loading}
      sx={{
        backgroundColor: "var(--brand--orange--color)",
        color: "var(--brand--white--color)",
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "var(--brand--hover--color)",
        },
      }}
    >
      {loading ? "Unpairing..." : "Unpair"}
    </Button>
  );
};

export default UnpairButton;
