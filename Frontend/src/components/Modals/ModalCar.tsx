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
  refreshData: () => void;
}

interface Car {
  carId: number;
  brand: string;
  model: string;
  color: string;
  year: number;
  licensePlate: string;
  chassis: string;
  fuel: string;
  transmission: string;
  category: string;
  status: string;
  image: string;
}

const ModalCar = ({ openModal, setOpenModal, refreshData }: ModalCarProps) => {
  const [formData, setFormData] = useState<Car>({
    carId: 0,
    brand: "",
    model: "",
    color: "",
    year: 0,
    licensePlate: "",
    chassis: "",
    transmission: "",
    category: "",
    status: "",
    image: "",
    fuel: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const Url = "http://localhost:5297/api/";

  const fetchAddCar = async () => {
    try {
      const response = await fetch(`${Url}Cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Car added successfully:", data);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
    fetchAddCar();
    refreshData();
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
              value={formData.brand}
              onChange={handleChange}
            />
            <TextField
              name="Model"
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
            <FormControl fullWidth required>
              <InputLabel>Color</InputLabel>
              <Select
                name="Color"
                label="Color"
                value={formData.color}
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
              value={formData.year}
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
              value={formData.licensePlate}
              onChange={handleChange}
            />
            <TextField
              name="Chassis"
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
              <InputLabel>Transmission</InputLabel>
              <Select
                name="Transmission"
                label="Transmission"
                value={formData.transmission}
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
                value={formData.category}
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
                value={formData.status}
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
