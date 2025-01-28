import React from "react";
import { Box, Typography } from "@mui/material";

interface VehicleDetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | boolean;
}

const VehicleDetailItem: React.FC<VehicleDetailItemProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <Box display="flex" alignItems="center">
      {icon}
      <Typography variant="body1" sx={{ ml: 1 }}>
        <strong>{label}:</strong> {value}
      </Typography>
    </Box>
  );
};

export default VehicleDetailItem;
