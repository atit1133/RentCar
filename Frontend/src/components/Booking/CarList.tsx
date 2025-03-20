import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

interface Car {
  id: number;
  brand: string;
  model: string;
  image: string;
}

interface Props {
  cars: Car[];
  selectedCar: number;
  onSelectCar: (carId: number) => void;
}

const CarList = ({ cars, selectedCar, onSelectCar }: Props) => {
  return (
    <Box
      sx={{
        width: "20%",
        p: 2,
        borderRight: "1px solid #ccc",
        bgcolor: "secondary.main",
      }}
    >
      <Typography variant="h6">Car Inventory</Typography>
      <List>
        {cars.map((car) => (
          <ListItemButton
            key={car.id}
            selected={car.id === selectedCar}
            onClick={() => onSelectCar(car.id)}
          >
            <ListItemAvatar>
              <Avatar src={car.image} alt={car.brand} />
            </ListItemAvatar>
            <ListItemText primary={car.brand} secondary={car.model} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default CarList;
