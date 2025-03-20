import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Box, Paper } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface Value {
  startRent: Dayjs | null;
  endRent: Dayjs | null;
}

export default function ModernDatePicker() {
  const [value, setValue] = useState<Value>({
    startRent: null,
    endRent: null,
  });

  const countDate =
    value.startRent && value.endRent
      ? dayjs(value.endRent).diff(dayjs(value.startRent), "day") + 1
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
              setValue((prev) => ({ ...prev, startRent: newValue }))
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
              setValue((prev) => ({ ...prev, endRent: newValue }))
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
