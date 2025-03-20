import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

interface ModalCarProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCar = ({ openModal, setOpenModal }: ModalCarProps) => {
  const [formData, setFormData] = useState({
    Brand: "",
    Model: "",
    Color: "",
    Year: "",
    LicensePlate: "",
    Chassis: "",
    Transmission: "",
    Category: "",
    Status: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
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
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: { xs: "90%", sm: "70%", md: "50%" },
        }}
      >
        <Typography
          id="modal-title"
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Register Car
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* First Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              name="Brand"
              label="Brand"
              variant="outlined"
              fullWidth
              required
              value={formData.Brand}
              onChange={handleChange}
            />
            <TextField
              name="Model"
              label="Model"
              variant="outlined"
              fullWidth
              required
              value={formData.Model}
              onChange={handleChange}
            />
          </Stack>

          {/* Second Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Color</InputLabel>
              <Select
                name="Color"
                label="Color"
                value={formData.Color}
                onChange={handleChange}
              >
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Black">Black</MenuItem>
                <MenuItem value="White">White</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="Year"
              label="Year"
              variant="outlined"
              fullWidth
              required
              value={formData.Year}
              onChange={handleChange}
            />
          </Stack>

          {/* Third Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              name="LicensePlate"
              label="License Plate"
              variant="outlined"
              fullWidth
              required
              value={formData.LicensePlate}
              onChange={handleChange}
            />
            <TextField
              name="Chassis"
              label="Chassis"
              variant="outlined"
              fullWidth
              required
              value={formData.Chassis}
              onChange={handleChange}
            />
          </Stack>

          {/* Fourth Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Transmission</InputLabel>
              <Select
                name="Transmission"
                label="Transmission"
                value={formData.Transmission}
                onChange={handleChange}
              >
                <MenuItem value="Automatic">Automatic</MenuItem>
                <MenuItem value="Manual">Manual</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="Category"
                label="Category"
                value={formData.Category}
                onChange={handleChange}
              >
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Fifth Row */}
          <Stack spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                name="Status"
                label="Status"
                value={formData.Status}
                onChange={handleChange}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Unavailable">Unavailable</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" component="label" sx={{ flexGrow: 10 }}>
              Upload Image
              <input type="file" hidden />
            </Button>
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Register New Car
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCar;
