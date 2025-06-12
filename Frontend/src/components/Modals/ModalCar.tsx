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
  FormHelperText,
  Alert,
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

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    brand: null,
    model: null,
    color: null,
    year: null,
    licensePlate: null,
    chassis: null,
    fuel: null,
    transmission: null,
    category: null,
    status: null,
    image: null,
  });
  const [imageError, setImageError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate Brand
    if (!formData.brand.trim()) {
      newErrors.brand = "Brand is required";
      isValid = false;
    } else {
      newErrors.brand = null;
    }

    // Validate Model
    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
      isValid = false;
    } else {
      newErrors.model = null;
    }

    // Validate Color
    if (!formData.color.trim()) {
      newErrors.color = "Color is required";
      isValid = false;
    } else {
      newErrors.color = null;
    }

    // Validate Year
    if (!formData.year.trim()) {
      newErrors.year = "Year is required";
      isValid = false;
    } else if (
      isNaN(Number(formData.year)) ||
      Number(formData.year) < 1900 ||
      Number(formData.year) > new Date().getFullYear() + 1
    ) {
      newErrors.year =
        "Year must be a number between 1900 and current year + 1";
      isValid = false;
    } else {
      newErrors.year = null;
    }

    // Validate License Plate
    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = "License Plate is required";
      isValid = false;
    } else {
      newErrors.licensePlate = null;
    }

    // Validate Chassis
    if (!formData.chassis.trim()) {
      newErrors.chassis = "Chassis is required";
      isValid = false;
    } else {
      newErrors.chassis = null;
    }

    // Validate Fuel
    if (!formData.fuel) {
      newErrors.fuel = "Fuel is required";
      isValid = false;
    } else {
      newErrors.fuel = null;
    }

    // Validate Transmission
    if (!formData.transmission) {
      newErrors.transmission = "Transmission is required";
      isValid = false;
    } else {
      newErrors.transmission = null;
    }

    // Validate Category
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
      isValid = false;
    } else {
      newErrors.category = null;
    }

    // Validate Status
    if (!formData.status) {
      newErrors.status = "Status is required";
      isValid = false;
    } else {
      newErrors.status = null;
    }

    // Validate Image
    if (!formData.image) {
      newErrors.image = "Image is required";
      isValid = false;
    } else if (!formData.image.type.startsWith("image/")) {
      newErrors.image = "File must be an image";
      isValid = false;
    } else {
      newErrors.image = null;
    }

    setErrors(newErrors);
    return isValid;
  };

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
      setErrors({ ...errors, image: null }); // Clear image error when a file is selected
      setImageError(null);
    }
  };
  const url = import.meta.env.VITE_RENTAL_APP_API_URL;

  const fetchSaveCar = async (formData: FormData) => {
    try {
      const response = await fetch(url + "/api/car", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log(response);
        console.log("Car saved successfully");
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      refreshData();
    } catch (error: any) {
      console.error("Failed to save car", error);
      setImageError(error.message || "Failed to save car");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
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
          Add Car
        </Typography>
        {imageError && <Alert severity="error">{imageError}</Alert>}

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
            <FormControl fullWidth error={!!errors.brand}>
              <TextField
                name="brand"
                label="Brand"
                variant="outlined"
                fullWidth
                required
                value={formData.brand}
                onChange={handleChange}
              />
              {errors.brand && (
                <FormHelperText error>{errors.brand}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={!!errors.model}>
              <TextField
                name="model"
                label="Model"
                variant="outlined"
                fullWidth
                required
                value={formData.model}
                onChange={handleChange}
              />
              {errors.model && (
                <FormHelperText error>{errors.model}</FormHelperText>
              )}
            </FormControl>
          </Stack>

          {/* Second Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth error={!!errors.color}>
              <TextField
                name="color"
                label="Color"
                variant="outlined"
                fullWidth
                required
                value={formData.color}
                onChange={handleChange}
              />
              {errors.color && (
                <FormHelperText error>{errors.color}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={!!errors.year}>
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
              {errors.year && (
                <FormHelperText error>{errors.year}</FormHelperText>
              )}
            </FormControl>
          </Stack>

          {/* Third Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth error={!!errors.licensePlate}>
              <TextField
                name="licensePlate"
                label="License Plate"
                variant="outlined"
                fullWidth
                required
                value={formData.licensePlate}
                onChange={handleChange}
              />
              {errors.licensePlate && (
                <FormHelperText error>{errors.licensePlate}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={!!errors.chassis}>
              <TextField
                name="chassis"
                label="Chassis"
                variant="outlined"
                fullWidth
                required
                value={formData.chassis}
                onChange={handleChange}
              />
              {errors.chassis && (
                <FormHelperText error>{errors.chassis}</FormHelperText>
              )}
            </FormControl>
          </Stack>

          {/* Fourth Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth required error={!!errors.fuel}>
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
              {errors.fuel && (
                <FormHelperText error>{errors.fuel}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth required error={!!errors.transmission}>
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
              {errors.transmission && (
                <FormHelperText error>{errors.transmission}</FormHelperText>
              )}
            </FormControl>
          </Stack>

          {/* Fifth Row */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth required error={!!errors.status}>
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
              {errors.status && (
                <FormHelperText error>{errors.status}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={!!errors.category}>
              <TextField
                name="category"
                label="Category"
                variant="outlined"
                fullWidth
                required
                value={formData.category}
                onChange={handleChange}
              />
              {errors.category && (
                <FormHelperText error>{errors.category}</FormHelperText>
              )}
            </FormControl>
          </Stack>

          {/* Image Upload */}
          <Stack spacing={2}>
            <FormControl fullWidth error={!!errors.image}>
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
              {errors.image && (
                <FormHelperText error>{errors.image}</FormHelperText>
              )}
            </FormControl>
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
