import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
  Alert,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

interface UserForm {
  name: string;
  email: string;
  password?: string;
  role: string;
}

const ModalCustomer = ({
  openModal,
  setOpenModal,
  refreshData,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  refreshData: () => void;
}) => {
  const [formData, setFormData] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    name: null,
    email: null,
    role: null,
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const url = import.meta.env.VITE_RENTAL_APP_API_URL;

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else {
      newErrors.name = null;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    } else {
      newErrors.email = null;
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    } else {
      newErrors.role = null;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    setApiError(null); // Clear previous API errors
    setSuccess(false);
    // setErrors({ name: null, email: null, role: null }); // Clear previous field errors

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await fetch(url + "/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setSuccess(true);
      setFormData({ name: "", email: "", password: "", role: "" });
      setOpenModal(false);
      refreshData();
    } catch (error: any) {
      console.error("Registration failed:", error);
      setApiError(error.message || "An error occurred during registration.");
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: { xs: "90%", sm: "50%" },
        }}
      >
        <Typography
          id="modal-title"
          variant="h5"
          fontWeight="bold"
          color="primary"
          textAlign="center"
          mb={3}
        >
          Register Customer
        </Typography>
        {apiError && <Alert severity="error">{apiError}</Alert>}
        {success && <Alert severity="success">Register successful!</Alert>}

        <Stack spacing={3}>
          <FormControl variant="outlined" fullWidth error={!!errors.name}>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <OutlinedInput
              id="name-input"
              name="name"
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            {errors.name && (
              <FormHelperText error>{errors.name}</FormHelperText>
            )}
          </FormControl>
          <FormControl variant="outlined" fullWidth error={!!errors.email}>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput
              id="email-input"
              name="email"
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth error={!!errors.role}>
            <InputLabel htmlFor="role-input">Role</InputLabel>
            <Select
              id="role-input"
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as string })
              }
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {errors.role && (
              <FormHelperText error>{errors.role}</FormHelperText>
            )}
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} mt={4} justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="outlined" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalCustomer;
