import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Car {
  carId: number;
  brand: string;
  model: string;
  image: string;
}

interface Props {
  cars: Car[];
  selectedCar: number | null;
  onSelectCar: (carId: number) => void;
}

const CarList = ({ cars, selectedCar, onSelectCar }: Props) => {
  const [listCar, setListCar] = useState<Car>();
  console.log(listCar);
  return (
    <Box
      sx={{
        width: "20%",
        p: 2,
        borderRight: "1px solid #ccc",
        bgcolor: "secondary.main",
      }}
    >
      <Typography variant="h6">Car Inventory </Typography>
      <List>
        {cars.map((car) => (
          <ListItemButton
            key={car.carId}
            selected={car.carId === selectedCar}
            onClick={() => {
              onSelectCar(car.carId);
              // setListCar(car);
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={"http://localhost:5297" + car.image}
                alt={car.brand}
              />
            </ListItemAvatar>
            <ListItemText primary={car.brand} secondary={car.model} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default CarList;
