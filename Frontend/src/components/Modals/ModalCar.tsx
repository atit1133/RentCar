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
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface ModalCarProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  refreshData: () => void;
}

const ModalCar = ({ openModal, setOpenModal, refreshData }: ModalCarProps) => {
  const [formData, setFormData] = useState({
    carId: 0,
    brand: "",
    model: "",
    color: "",
    year: "",
    licensePlate: "",
    chassis: "",
    fuel: "",
    transmission: "",
    category: "",
    status: "",
    image: null as File | null,
    createdBy: "",
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const fetchSaveCar = async (formData: FormData) => {
    const response = await fetch("http://localhost:5297/api/car", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      console.log(response);
      console.log("Car saved successfully");
    } else {
      console.error("Failed to save car");
    }
    refreshData();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Send data to the backend
    const formDataSent = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined)
        formDataSent.append(key, value instanceof File ? value : String(value));
    });

    fetchSaveCar(formDataSent);

    // console.log("Form submitted:", formData);

    setOpenModal(false);
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
          Add or Edit Car
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
              name="brand"
              label="Brand"
              variant="outlined"
              fullWidth
              required
              value={formData.brand}
              onChange={handleChange}
            />
            <TextField
              name="model"
              label="Model"
              variant="outlined"
              fullWidth
              required
              value={formData.model}
              onChange={handleChange}
            />
          </Stack>

          {/* Second Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              name="color"
              label="Color"
              variant="outlined"
              fullWidth
              required
              value={formData.color}
              onChange={handleChange}
            />
            <TextField
              name="year"
              label="Year"
              type="number"
              variant="outlined"
              fullWidth
              required
              value={formData.year}
              onChange={handleChange}
            />
          </Stack>

          {/* Third Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              name="licensePlate"
              label="License Plate"
              variant="outlined"
              fullWidth
              required
              value={formData.licensePlate}
              onChange={handleChange}
            />
            <TextField
              name="chassis"
              label="Chassis"
              variant="outlined"
              fullWidth
              required
              value={formData.chassis}
              onChange={handleChange}
            />
          </Stack>

          {/* Fourth Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Fuel</InputLabel>
              <Select
                name="fuel"
                label="Fuel"
                value={formData.fuel}
                onChange={handleChange}
              >
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
                <MenuItem value="LPG">LPG</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel>Transmission</InputLabel>
              <Select
                name="transmission"
                label="Transmission"
                value={formData.transmission}
                onChange={handleChange}
              >
                <MenuItem value="Manual">Manual</MenuItem>
                <MenuItem value="Automatic">Automatic</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Fifth Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                label="Status"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Rented">Rented</MenuItem>
                <MenuItem value="UnderMaintenance">Under Maintenance</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="category"
              label="Category"
              variant="outlined"
              fullWidth
              required
              value={formData.category}
              onChange={handleChange}
            />
          </Stack>

          {/* Image Upload */}
          <Stack spacing={2}>
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                hidden
                required
              />
            </Button>
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
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
