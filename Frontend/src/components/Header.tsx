import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem } from "@mui/material";
import AppContext from "../AppContext";
import { useContext } from "react";

export default function ButtonAppBar() {
  const { handleMenu, isLogin } = useContext(AppContext);
  const pages = ["Home", "Booking", "Gallery", "Services", "About Us"];

  const handleCloseNavMenu = () => {
    return;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "start" }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <a
                  href={`/${page.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </a>
              </MenuItem>
            ))}
          </Box>
          <Box>
            {isLogin ? (
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  width: "125px",
                  fontSize: "1rem",
                }}
              >
                Welcome, User
              </Typography>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  sx={{ fontSize: "1rem" }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
