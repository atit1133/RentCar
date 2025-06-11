import { Shield } from "@mui/icons-material";
import { Badge, Button, Card, Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Home = () => {
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

  const services = [
    {
      icon: Shield,
      title: "Insurance Coverage",
      description:
        "Comprehensive protection for your peace of mind during every journey.",
    },
    {
      icon: Shield,
      title: "GPS Navigation",
      description:
        "Never get lost with our state-of-the-art navigation systems in every vehicle.",
    },
    {
      icon: Shield,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance whenever you need help during your rental period.",
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 8, md: 12 },
            px: 2,
            borderRadius: 6,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light}11, ${theme.palette.secondary.light}22)`,
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            mb={3}
            color="text.primary"
            sx={{ fontSize: { xs: 32, md: 56 } }}
          >
            Your Perfect
            <Box component="span" sx={{ color: "primary.main" }}>
              {" "}
              Journey
            </Box>{" "}
            Starts Here
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            mb={4}
            sx={{ maxWidth: 700, mx: "auto", fontSize: { xs: 18, md: 24 } }}
          >
            Discover freedom on the road with our premium fleet of rental cars.
            Safe, reliable, and ready for your next adventure.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                fontSize: 18,
                px: 6,
                py: 2,
                borderRadius: 999,
                fontWeight: "bold",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              Book Your Car Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                fontSize: 18,
                px: 6,
                py: 2,
                borderRadius: 999,
                fontWeight: "bold",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              View Our Fleet
            </Button>
          </Box>
        </Box>

        {/* Features */}
        <Box sx={{ py: 8, px: 2 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            align="center"
            mb={6}
            color="text.primary"
            sx={{ fontSize: { xs: 28, md: 36 } }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    transition: "all 0.3s",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-8px)",
                    },
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.light}11)`,
                    border: 0,
                  }}
                >
                  <service.icon
                    sx={{ fontSize: 64, color: "primary.main", mb: 3 }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={2}
                    color="text.primary"
                  >
                    {service.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 18 }}>
                    {service.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Preview of Cars */}
        <Box
          sx={{
            py: 8,
            px: 2,
            borderRadius: 6,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.secondary.light}11, ${theme.palette.primary.light}11)`,
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            align="center"
            mb={6}
            color="text.primary"
            sx={{ fontSize: { xs: 28, md: 36 } }}
          >
            Popular Vehicles
          </Typography>
          <Grid container spacing={4}>
            {cars.map((car) => (
              <Grid size={{ xs: 12, md: 4 }} key={car.id}>
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
                      height: 192,
                      background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* You can add a car image here if available */}
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        {car.name}
                      </Typography>
                      <Badge
                        sx={{
                          fontSize: 18,
                          fontWeight: "bold",
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                        }}
                      >
                        {car.price}/day
                      </Badge>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {car.features.map((feature, index) => (
                        <Badge
                          key={index}
                          sx={{
                            bgcolor: "grey.100",
                            color: "text.secondary",
                            borderRadius: 1,
                            px: 1,
                            fontSize: 14,
                          }}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 999,
                px: 6,
                fontWeight: "bold",
                fontSize: 18,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              View All Vehicles
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
