import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import ModalCar from "../components/Modals/ModalCar";
import { useEffect, useState } from "react";

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

const Cardetail = () => {
  const Url = "http://localhost:5297/api/";
  const [openModal, setOpenModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [carData, setCarData] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const handleAddCar = (newCar: Car) => {
    setCarData([...carData, newCar]);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (car: Car) => {
    setSelectedCar(car);
    setOpenModal(true);
  };

  const fetchCarData = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const response = await fetch(Url + "Car");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      const data: Car[] = await response.json();
      setCarData(data);
      console.log("Fetch Data : ", data);
    } catch (error: any) {
      console.error("Error fetching car data:", error);
      setError(error.message || "An error occurred while fetching car data.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchDeleteCar = async (id: number) => {
    try {
      const response = await fetch(`${Url}Car/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      return response.ok;
    } catch (error: any) {
      console.error("Delete failed:", error);
      throw error;
    }
  };

  const handleDeleteCar = async (carId: number) => {
    try {
      await fetchDeleteCar(carId);
      fetchCarData();
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  return (
    <Box sx={{ px: 4, py: 6 }}>
      {/* Header Section */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          Car Details
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Add Car
        </Button>
      </Stack>
      {loading && <Alert severity="info">Loading...</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Car Image
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Car Model
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carData.map((car) => (
              <TableRow key={car.carId} hover>
                <TableCell>
                  <Avatar
                    src={car.image}
                    alt={car.brand}
                    variant="square"
                    sx={{ width: 60, height: 60, borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {car.model}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" color="text.secondary">
                    {car.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteCar(car.carId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Section */}
      {openModal && (
        <ModalCar
          openModal={openModal}
          setOpenModal={setOpenModal}
          refreshData={fetchCarData}
        />
      )}
    </Box>
  );
};

export default Cardetail;
