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
} from "@mui/material";
import ModalCar from "../components/Modals/ModalCar";
import { useState } from "react";

const carData = [
  {
    id: 1,
    name: "Toyota Camry",
    imageUrl: "path-to-your-image/toyota-camry.jpg",
    price: "$40/day",
  },
  {
    id: 2,
    name: "Honda Accord",
    imageUrl: "path-to-your-image/honda-accord.jpg",
    price: "$45/day",
  },
  // Add more car data here...
];

const Cardetail = () => {
  const [openModal, setOpenModal] = useState(false);

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

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Car Image
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Car Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carData.map((car) => (
              <TableRow key={car.id} hover>
                <TableCell>
                  <Avatar
                    src={car.imageUrl}
                    alt={car.name}
                    variant="square"
                    sx={{ width: 60, height: 60, borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {car.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" color="text.secondary">
                    {car.price}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Section */}
      {openModal && (
        <ModalCar openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </Box>
  );
};

export default Cardetail;
