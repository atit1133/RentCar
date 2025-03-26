import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Box, Paper } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

type Rental = {
  rentialId: number;
  userId: number;
  carId: number;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  status: string;
  total: number;
  paymentMethod: string;
};

const initDatavalue: Rental = {
  rentialId: 0,
  userId: 0,
  carId: 0,
  startDate: null,
  endDate: null,
  status: "Rented",
  total: 0,
  paymentMethod: "Cash",
};

export default function ModernDatePicker({
  bookingId,
  closeModal,
}: {
  bookingId: number;
  closeModal: () => void;
}) {
  const [value, setValue] = useState<Rental>(initDatavalue);

  const handleSave = async () => {
    const { carId, ...rest } = value;
    const data = {
      ...rest,
      carId: bookingId,
      total: value.endDate && value.startDate ? countDate * 2000 : 0,
    };
    console.log("Save", data); // Log the data

    // Add your logic here to send the data to the backend
    try {
      const response = await fetch("http://localhost:5297/api/Rential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to save rental (Status: ${response.status})`);
      }

      const result = await response.json();
      console.log("Rental saved successfully:", result);
      // ... Handle success (e.g., show success message)
    } catch (error) {
      console.error("Failed to save rental:", error);
      // ... Handle error (e.g., show error message)
    }
    closeModal();
  };

  const countDate =
    value.startDate && value.endDate
      ? dayjs(value.endDate).diff(dayjs(value.startDate), "day") + 1
      : 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          margin: "0 auto",
          maxWidth: 500,
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          align="center"
          gutterBottom
        >
          Car Rental Date Selection
        </Typography>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            onChange={(newValue: Dayjs | null) =>
              setValue((prev) => ({ ...prev, startDate: newValue }))
            }
            name="startRent"
            label="Start Date Rental"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <DatePicker
            onChange={(newValue: Dayjs | null) =>
              setValue((prev) => ({ ...prev, endDate: newValue }))
            }
            name="endRent"
            label="End Date Rental"
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </DemoContainer>
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: "8px",
            backgroundColor: "#F5F5F5",
            textAlign: "center",
          }}
        >
          {countDate > 0 ? (
            <>
              <Typography variant="body1">
                Rental Period: {countDate} {countDate > 1 ? "days" : "day"}
              </Typography>
              <Typography variant="body1">
                Price per day: <b>2000</b> THB
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                Total: {countDate * 2000} THB
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Please select both start and end dates to calculate.
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Save
        </Button>
      </Paper>
    </LocalizationProvider>
  );
}
