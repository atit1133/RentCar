import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

const ModalCustomer = ({ openModal, setOpenModal }) => {
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

        <Stack spacing={3}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <OutlinedInput id="name-input" name="name" label="Name" />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="email-input">Email</InputLabel>
            <OutlinedInput id="email-input" name="email" label="Email" />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <OutlinedInput
              id="password-input"
              name="password"
              label="Password"
              type="password"
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="role-input">Role</InputLabel>
            <OutlinedInput id="role-input" name="role" label="Role" />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} mt={4} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("Register Clicked")}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            // color=""
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalCustomer;
