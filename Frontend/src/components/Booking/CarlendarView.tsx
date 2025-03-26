import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Box, Modal, Typography } from "@mui/material";
import "./style.css";
import { useState } from "react";
import ModalRangBooking from "../Modals/ModalRangBooking";
import ListCustomer from "../common/ListCustomer";
import ModalCustomer from "../Modals/ModalCustomer";
import Customer from "../../pages/Customer";

interface Event {
  total: number;
  startDate: Date;
  endDate: Date;
}

const CalendarView = ({
  events,
  selectedCar,
}: {
  events: Event[];
  selectedCar: number | null;
}) => {
  const [isModal, setIsModal] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  console.log("Select  Car Booking :", selectedCar);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Booking Calendar</Typography>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map((event) => ({
          title: event.total.toString(),
          start: event.startDate,
          end: event.endDate,
        }))}
        headerToolbar={{
          left: "prev,next today,customBooking",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        customButtons={{
          customBooking: {
            text: "Book",
            click: function () {
              setIsModal(true);
            },
          },
        }}
        eventColor="#0288d1"
        eventDisplay="block"
        eventContent={(arg) => {
          return (
            <Box sx={{ p: 1, fontFamily: "cursive" }}>{arg.event.title}</Box>
          );
        }}
        height="auto"
      />
      {isModal && (
        <Modal open={isModal} onClose={() => setIsModal(false)}>
          <Box
            sx={{
              p: 2,
              // textAlign: "center",
              // justifyContent: "center",
              // alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h6">Booking Car</Typography>
            {/* <ListCustomer /> */}
            <Customer />
            <ModalRangBooking
              closeModal={() => setIsModal(false)}
              bookingId={Number(selectedCar)}
            />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default CalendarView;
