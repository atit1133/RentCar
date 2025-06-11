import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });
  const { handleLogin, handleMenu } = useContext(AppContext);
  const [isRegister, setRegister] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch("http://localhost:5297/api/User/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        confirmPassword: user.confirmPassword,
        email: user.email,
        phone: user.phone,
      }),
    });
    if (!response.ok) {
      setAlert({
        type: "error",
        message: "Registration failed. Please try again.",
      });
      console.error("Register failed");
      return;
    }
    await clickLogin();
  };
  const clickLogin = async () => {
    const response = await fetch("http://localhost:5297/api/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    if (!response.ok) {
      setAlert({
        type: "error",
        message: "Login failed. Please try again.",
      });
      console.error("Login failed");
      return;
    }
    const data = await response.json();
    console.log(data);
    handleLogin(data.token);
    // window.location.href = "/";
    navigate("/");
    handleMenu();
    console.log("Login clicked");
  };

  const handleChange = (e: any) => {
    setAlert({ type: "", message: "" });
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const clickRegister = () => {
    setRegister(!isRegister);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ height: "80vh", display: "flex", color: "text.secondary.main" }}
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
          {!isRegister ? (
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
                <Typography variant="h2">Rental Car Management </Typography>
                <Typography variant="body1" mt={2}>
                  Please login to continue
                </Typography>
                <br />
              </Box>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <FormControl
                  sx={{
                    m: 1,
                    width: "50%",
                  }}
                  variant="outlined"
                >
                  <InputLabel>Username</InputLabel>
                  <OutlinedInput
                    name="email"
                    onChange={handleChange}
                    label="Username"
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: "50%" }}
                  id="outlined-adornment-password"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    onChange={handleChange}
                    label="Password"
                    type="password"
                  />
                </FormControl>
              </Box>
              <Box>
                {alert.type === "error" && (
                  <Typography variant="body2" color="text.alert">
                    {alert.message}
                  </Typography>
                )}
              </Box>

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
                <Button variant="contained" onClick={clickLogin}>
                  Login
                </Button>
                <Button variant="outlined" onClick={clickRegister}>
                  Register
                </Button>
              </Box>
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
                  <p>Please register to continue</p>
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
                  <OutlinedInput
                    name="username"
                    onChange={handleChange}
                    label="Username"
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: "50%" }}
                  id="outlined-adornment-password"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    onChange={handleChange}
                    label="Password"
                    type="password"
                  />
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
                    name="confirmPassword"
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
                  <OutlinedInput
                    name="email"
                    onChange={handleChange}
                    label="Email"
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  sx={{ m: 1, width: "50%" }}
                  id="outlined-adornment-password"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Phone
                  </InputLabel>
                  <OutlinedInput
                    name="phone"
                    onChange={handleChange}
                    label="Phone"
                  />
                </FormControl>
                {/* </Box> */}
              </Box>
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
                <Button variant="contained" onClick={handleRegister}>
                  Register
                </Button>
                <Button variant="outlined" onClick={clickRegister}>
                  Login
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
