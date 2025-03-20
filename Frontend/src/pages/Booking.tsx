import { useState } from "react";
import { Box } from "@mui/material";
import CarList from "../components/Booking/CarList";
import CalendarView from "../components/Booking/CarlendarView";

const cars = [
  { id: 1, brand: "Toyota", model: "Corolla", image: "/path/to/image1.jpg" },
  { id: 2, brand: "Honda", model: "Civic", image: "/path/to/image2.jpg" },
  // Add more cars as needed
];

const events = [
  {
    title: "Rented",
    start: new Date(2025, 2, 15),
    end: new Date(2025, 2, 18),
    carId: 1,
  },
  {
    title: "Rented",
    start: new Date(2025, 3, 20),
    end: new Date(2025, 3, 22),
    carId: 1,
  },
  // Add more events as needed
];

const Booking = () => {
  const [selectedCar, setSelectedCar] = useState(cars[0].id);

  const handleSelectCar = (id: number): void => {
    setSelectedCar(id);
  };

  const filteredEvents = events.filter((event) => event.carId === selectedCar);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CarList
        cars={cars}
        selectedCar={selectedCar}
        onSelectCar={handleSelectCar}
      />
      {/* <CalendarView events={filteredEvents} /> */}
      <CalendarView events={filteredEvents} />
    </Box>
  );
};

export default Booking;
