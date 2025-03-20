import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  // const [showPassword, setShowPassword] = useState(true);

  const handleRegister = () => {
    setIsLogin(false);
  };
  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleChange = (e: any) => {
    setUsername({ ...username, [e.target.name]: e.target.value });
    console.log(username);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ height: "100vh", display: "flex", color: "text.secondary.main" }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            width: "600px",
            bgcolor: "primary.secondary",
            border: 1,
            borderRadius: "10px",
          }}
        >
          {isLogin ? (
            <Box
              sx={{
                display: "flex", // Use flexbox for horizontal layout
                alignItems: "center", // Align vertically in the center
                justifyContent: "center", // Align horizontally in the center
                gap: 2,
                padding: 2,
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ textAlign: "center", width: "100%" }}>
                <Typography variant="h2">Login Page</Typography>
                <Typography variant="body1" mt={2}>
                  Please login to continue
                </Typography>
                <br />
              </Box>
              <FormControl
                sx={{
                  m: 1,
                  width: "50%",
                }}
                variant="outlined"
              >
                <InputLabel>Username</InputLabel>
                <OutlinedInput onChange={handleChange} label="Username" />
              </FormControl>
              <FormControl
                variant="outlined"
                sx={{ m: 1, width: "50%" }}
                id="outlined-adornment-password"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput onChange={handleChange} label="Password" />
              </FormControl>
            </Box>
          ) : (
            <Box>
              <Box
                sx={{
                  display: "flex", // Use flexbox for horizontal layout
                  alignItems: "center", // Align vertically in the center
                  justifyContent: "center", // Align horizontally in the center
                  gap: 2,
                  padding: 2,
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ textAlign: "center", width: "100%" }}>
                  <h1>Register Page</h1>
                  <p>Please register to continue</p>
                  <br />
                </Box>
                {/* <Box> */}
                <FormControl
                  sx={{
                    m: 1,
                    width: "50%",
                  }}
                  variant="outlined"
                >
                  <InputLabel>Username</InputLabel>
                  <OutlinedInput onChange={handleChange} label="Username" />
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: "50%" }}
                  id="outlined-adornment-password"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput onChange={handleChange} label="Password" />
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: "50%" }}
                  id="outlined-adornment-password"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    onChange={handleChange}
                    label="Confirm Password"
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: "50%" }}
                  id="outlined-adornment-password"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Email
                  </InputLabel>
                  <OutlinedInput onChange={handleChange} label="Email" />
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: "50%" }}
                  id="outlined-adornment-password"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Phone
                  </InputLabel>
                  <OutlinedInput onChange={handleChange} label="Phone" />
                </FormControl>
                {/* </Box> */}
              </Box>
            </Box>
          )}
          <Box
            sx={{
              m: 1,
              width: "100%",
              textAlign: "center",
              gap: 2,
              display: "flex",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outlined" onClick={handleRegister}>
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
