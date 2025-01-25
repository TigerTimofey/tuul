import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

interface NavbarProps {
  userEmail: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ userEmail }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "var(  --brand--blue--color)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Ubuntu", fontWeight: "700" }}
        >
          Welcome back, {userEmail}!
        </Typography>
        <Button
          sx={{
            fontFamily: "Ubuntu",
            fontWeight: "700",
            fontSize: "1.2rem",
            color: "inherit",
            "&:hover": {
              color: "var(--brand--orange--color)",
              backgroundColor: "transparent",
            },
          }}
          color="inherit"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
