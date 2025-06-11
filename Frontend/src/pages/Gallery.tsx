import { Star } from "@mui/icons-material";
import { Badge, Button, Card, Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Gallery = () => {
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
    <Container maxWidth="xl" sx={{ bgcolor: "background.default", py: 8 }}>
      <Box sx={{ px: 4 }}>
        <Typography
          variant="h1"
          fontWeight="bold"
          align="center"
          mb={4}
          color="text.primary"
        >
          Our Vehicle Gallery
        </Typography>
        <Typography
          variant="h6"
          align="center"
          mb={6}
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          Explore our diverse fleet of well-maintained, premium vehicles
        </Typography>

        <Grid container spacing={4} mb={8}>
          {cars.map((car) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={car.id}>
              <Card
                elevation={0}
                sx={{
                  overflow: "hidden",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-8px)",
                  },
                  border: 0,
                }}
              >
                <Box
                  sx={{
                    height: 256,
                    background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* You can add a car image here if available */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                    }}
                  >
                    <Badge
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {car.price}/day
                    </Badge>
                  </Box>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={2}
                    color="text.primary"
                  >
                    {car.name}
                  </Typography>
                  <Grid container spacing={1} mb={2}>
                    {car.features.map((feature, index) => (
                      <Grid size={{ xs: 6, md: 4 }} key={index}>
                        <Badge
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            bgcolor: "grey.100",
                            color: "text.secondary",
                            borderRadius: 1,
                            py: 0.5,
                            fontSize: 14,
                          }}
                        >
                          {feature}
                        </Badge>
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} sx={{ fontSize: 20, color: "#facc15" }} />
                    ))}
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      4.9 (124 reviews)
                    </Typography>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      borderRadius: 999,
                      fontWeight: "bold",
                      fontSize: 16,
                      py: 1.5,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Gallery;
