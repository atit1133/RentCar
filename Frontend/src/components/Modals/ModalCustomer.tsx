import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
  Alert, // Import Alert
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
  refreshData, // Add refreshData prop
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  refreshData: () => void; // Add refreshData type
}) => {
  const [formData, setFormData] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [success, setSuccess] = useState<boolean>(false); // State for success message

  const handleRegister = async () => {
    setError(null); // Clear previous errors
    setSuccess(false); // Clear previous success

    try {
      const response = await fetch("http://localhost:5297/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Correct placement of body
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
      // Reset the form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      setOpenModal(false);
      refreshData(); // Refresh data in DataGrid
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError(error.message || "An error occurred during registration.");
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
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Register successful!</Alert>}

        <Stack spacing={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <OutlinedInput
              id="name-input"
              name="name"
              label="Name"
              value={formData.name} // Add value
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput
              id="email-input"
              name="email"
              label="Email"
              value={formData.email} // Add value
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              name="password"
              label="Password"
              type="password"
              value={formData.password} // Add value
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="role-input">Role</InputLabel>
            <OutlinedInput
              id="role-input"
              name="role"
              label="Role"
              value={formData.role} // Add value
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
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
