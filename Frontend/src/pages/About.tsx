import { Shield } from "@mui/icons-material";
import { Button, Card, Container, Box, Typography } from "@mui/material";
import {
  green,
  red,
  yellow,
  blue,
  grey,
  orange,
  pink,
  purple,
  teal,
} from "@mui/material/colors";
import Grid from "@mui/material/Grid2";

const About = () => {
  return (
    <Container maxWidth="xl" sx={{ bgcolor: "background.default", py: 8 }}>
      <Box>
        <Box sx={{ px: 4 }}>
          <Typography
            variant="h1"
            fontWeight="bold"
            align="center"
            mb={4}
            color="text.primary"
          >
            About Us
          </Typography>
          <Typography
            variant="h6"
            align="center"
            mb={8}
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            Your trusted partner in exploring the world, one journey at a time
          </Typography>

          <Grid container spacing={6} alignItems="center" mb={8}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
                color="text.primary"
              >
                Our Story
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                mb={3}
                sx={{ lineHeight: 1.7 }}
              >
                For over 15 years, we've been dedicated to making travel
                accessible and enjoyable for everyone. What started as a small
                family business has grown into a trusted name in car rentals,
                but we've never forgotten our roots.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                mb={3}
                sx={{ lineHeight: 1.7 }}
              >
                We believe that every journey should be comfortable, safe, and
                memorable. That's why we maintain the highest standards for our
                vehicles and customer service, ensuring that your rental
                experience exceeds expectations every time.
              </Typography>
              <Grid container spacing={3} mt={2}>
                <Grid size={{ xs: 4 }}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      15+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Years Experience
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      50K+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Happy Customers
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Box textAlign="center">
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      200+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vehicles
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  background: () =>
                    `linear-gradient(135deg, ${grey[500]}11, ${green[200]}22)`,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  mb={3}
                  color="text.primary"
                >
                  Our Mission
                </Typography>
                <Box mb={2} display="flex" alignItems="flex-start" gap={2}>
                  <Shield color="primary" sx={{ fontSize: 32, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight="bold" color="text.primary">
                      Safety First
                    </Typography>
                    <Typography color="text.secondary">
                      Every vehicle undergoes rigorous safety inspections
                    </Typography>
                  </Box>
                </Box>
                <Box mb={2} display="flex" alignItems="flex-start" gap={2}>
                  <Shield color="primary" sx={{ fontSize: 32, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight="bold" color="text.primary">
                      Excellence
                    </Typography>
                    <Typography color="text.secondary">
                      We strive for perfection in every interaction
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="flex-start" gap={2}>
                  <Shield color="primary" sx={{ fontSize: 32, mt: 0.5 }} />
                  <Box>
                    <Typography fontWeight="bold" color="text.primary">
                      Customer Focus
                    </Typography>
                    <Typography color="text.secondary">
                      Your satisfaction is our top priority
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Box
            textAlign="center"
            sx={{
              background: (theme) =>
                `linear-gradient(135deg, ${grey[500]}11, ${green[200]}22)`,
              borderRadius: 6,
              p: 6,
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              mb={3}
              color="text.primary"
            >
              Ready to Start Your Journey?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              mb={4}
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Join thousands of satisfied customers who trust us with their
              travel needs. Book your car today and experience the difference.
            </Typography>
            <Button
              size="large"
              sx={{
                px: 6,
                py: 2,
                borderRadius: 999,
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.05)",
                },
                boxShadow: 3,
                fontSize: "1.125rem",
                fontWeight: "bold",
                transition: "transform 0.2s",
              }}
              href="/booking"
            >
              Book Your Car Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
