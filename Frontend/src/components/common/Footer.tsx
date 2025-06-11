import { Box, Typography, Container } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#4D869C",
        color: "#fff",
        fontSize: "0.95rem",
        position: { xs: "fixed", md: "relative" },
        bottom: { xs: 0, md: "auto" },
        left: 0,
        width: "100%",
        zIndex: 1300,
        py: 2,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          gap: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: { xs: "center", sm: "right" } }}
        >
          Privacy Policy | Terms of Service
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
