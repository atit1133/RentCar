import { Shield } from "@mui/icons-material";
import { Card, Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Services = () => {
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
    <Container maxWidth="xl" sx={{ bgcolor: "background.default", py: 8 }}>
      <Box sx={{ px: 4 }}>
        <Typography
          variant="h1"
          fontWeight="bold"
          align="center"
          mb={4}
          color="text.primary"
        >
          Our Services
        </Typography>
        <Typography
          variant="h6"
          align="center"
          mb={6}
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          We go beyond just car rental to ensure your journey is smooth, safe,
          and memorable
        </Typography>

        <Grid container spacing={4} mb={8}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, md: 4, lg: 4 }} key={index}>
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
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    bgcolor: "primary.light",
                    opacity: 0.1,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <service.icon
                    sx={{ fontSize: 40, color: "primary.main", opacity: 1 }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mb={2}
                  color="text.primary"
                >
                  {service.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: 18, lineHeight: 1.7 }}
                >
                  {service.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={3}
              color="text.primary"
            >
              Additional Services
            </Typography>
            <Box>
              {[
                {
                  title: "Airport Pickup & Drop-off",
                  desc: "Convenient service right at the terminal",
                },
                {
                  title: "Child Safety Seats",
                  desc: "Complimentary child seats for family trips",
                },
                {
                  title: "Fuel Service",
                  desc: "Pre-paid fuel options available",
                },
                {
                  title: "Extended Coverage",
                  desc: "Additional insurance options for peace of mind",
                },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  alignItems="flex-start"
                  gap={2}
                  mb={2}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                      mt: 1.2,
                      flexShrink: 0,
                    }}
                  />
                  <Box>
                    <Typography
                      fontWeight="bold"
                      fontSize={18}
                      color="text.primary"
                    >
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">{item.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              elevation={0}
              sx={{
                p: 4,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light}11, ${theme.palette.secondary.light}22)`,
                border: 0,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={2}
                color="text.primary"
              >
                Need Custom Service?
              </Typography>
              <Typography color="text.secondary" mb={2}>
                Contact our friendly team for personalized rental solutions
                tailored to your specific needs.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Services;
