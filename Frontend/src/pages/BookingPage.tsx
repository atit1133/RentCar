import {
  Badge,
  Button,
  Card,
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

function BookingPage() {
  const cars = [
    {
      id: 1,
      name: "Compact Economy",
      price: "$29",
      image: "photo-1488590528505-98d2b5aba04b",
      features: ["4 Seats", "Manual", "AC", "Great MPG"],
    },
    {
      id: 2,
      name: "Mid-Size Comfort",
      price: "$45",
      image: "photo-1581091226825-a6a2a5aee158",
      features: ["5 Seats", "Automatic", "GPS", "Bluetooth"],
    },
    {
      id: 3,
      name: "Premium SUV",
      price: "$79",
      image: "photo-1460925895917-afdab827c52f",
      features: ["7 Seats", "4WD", "Luxury Interior", "Premium Sound"],
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2 }}>
        <Typography
          variant="h1"
          fontWeight="bold"
          align="center"
          mb={4}
          color="text.primary"
        >
          Book Your Perfect Car
        </Typography>
        <Typography variant="h6" align="center" mb={6} color="text.secondary">
          Choose your dates, select your vehicle, and hit the road!
        </Typography>

        <Card
          elevation={0}
          sx={{
            p: 4,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.light}11)`,
            border: 0,
          }}
        >
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Typography fontWeight="bold" mb={1} color="text.primary">
                    Pick-up Date
                  </Typography>
                  <TextField
                    type="date"
                    fullWidth
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box>
                  <Typography fontWeight="bold" mb={1} color="text.primary">
                    Return Date
                  </Typography>
                  <TextField
                    type="date"
                    fullWidth
                    size="medium"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box>
                  <Typography fontWeight="bold" mb={1} color="text.primary">
                    Pick-up Location
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="medium"
                    defaultValue="Airport Terminal"
                  >
                    <MenuItem value="Airport Terminal">
                      Airport Terminal
                    </MenuItem>
                    <MenuItem value="Downtown Office">Downtown Office</MenuItem>
                    <MenuItem value="Hotel Delivery">Hotel Delivery</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold" mb={2} color="text.primary">
                Available Cars
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cars.map((car) => (
                  <Card
                    key={car.id}
                    elevation={0}
                    sx={{
                      p: 2,
                      border: 2,
                      borderColor: "grey.200",
                      cursor: "pointer",
                      transition:
                        "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
                      "&:hover": {
                        boxShadow: 4,
                        borderColor: "primary.main",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          fontWeight="bold"
                          fontSize={18}
                          color="text.primary"
                        >
                          {car.name}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          {car.features.slice(0, 2).map((feature, index) => (
                            <Badge
                              key={index}
                              sx={{
                                bgcolor: "grey.100",
                                color: "text.secondary",
                                borderRadius: 1,
                                px: 1,
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              {feature}
                            </Badge>
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          fontWeight="bold"
                          fontSize={22}
                          color="primary.main"
                        >
                          {car.price}
                        </Typography>
                        <Typography fontSize={14} color="text.secondary">
                          per day
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: 18,
                borderRadius: 999,
                fontWeight: "bold",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Complete Booking
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default BookingPage;
