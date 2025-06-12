import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CarList from "../components/Booking/CarList";
import CalendarView from "../components/Booking/CarlendarView";

interface Car {
  carId: number;
  brand: string;
  model: string;
  image: string;
}

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  carId: number;
  total: number;
  startDate: Date;
  endDate: Date;
}

const Booking = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[]>([]); // Specify the type of events
  const url = import.meta.env.VITE_RENTAL_APP_API_URL;

  const fetchCars = async () => {
    const response = await fetch(url + "/api/car");
    if (!response.ok) {
      console.error("Failed to fetch cars");
      return;
    }
    const data: Car[] = await response.json();
    setCars(data);
    if (data.length > 0) {
      setSelectedCar(data[0].carId); // Use carId instead of id
    }
  };

  const handleSelectCar = (id: number): void => {
    setSelectedCar(id);
    // console.log("Selected :", id);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchEvents = async () => {
    if (!selectedCar) return; // Exit if no car is selected

    const response = await fetch(
      `${url}/api/Rential/${selectedCar}` // Use selectedCar here
    );
    if (!response.ok) {
      console.error("Failed to fetch events");
      return;
    }
    const data: Event[] = await response.json(); // Specify the type of data
    console.log("Events :", data);
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedCar]); // fetchEvents when selectedCar changes

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CarList
        cars={cars}
        selectedCar={selectedCar}
        onSelectCar={handleSelectCar}
      />
      <CalendarView
        selectedCar={selectedCar}
        events={events}
        fetchEvents={fetchEvents}
      />
    </Box>
  );
};

export default Booking;
