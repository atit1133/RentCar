import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Data remains unchanged
const carRentalData = [
  { month: "Jan", rentals: 120, revenue: 6000 },
  { month: "Feb", rentals: 150, revenue: 7500 },
  { month: "Mar", rentals: 180, revenue: 9000 },
  { month: "Apr", rentals: 200, revenue: 10000 },
  { month: "May", rentals: 220, revenue: 11000 },
  { month: "Jun", rentals: 250, revenue: 12500 },
  { month: "Jul", rentals: 230, revenue: 11500 },
  { month: "Aug", rentals: 210, revenue: 10500 },
  { month: "Sep", rentals: 190, revenue: 9500 },
  { month: "Oct", rentals: 170, revenue: 8500 },
  { month: "Nov", rentals: 140, revenue: 7000 },
  { month: "Dec", rentals: 160, revenue: 8000 },
];

const carTypeData = [
  { name: "Sedan", value: 400 },
  { name: "SUV", value: 300 },
  { name: "Hatchback", value: 200 },
  { name: "Truck", value: 100 },
];
const COLORS = ["#4CAF50", "#FF5722", "#3F51B5", "#FFC107"];

const Dashboard = () => {
  const [totalRentals, setTotalRentals] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageRevenue, setAverageRevenue] = useState(0);

  useEffect(() => {
    const rentals = carRentalData.reduce((sum, data) => sum + data.rentals, 0);
    const revenue = carRentalData.reduce((sum, data) => sum + data.revenue, 0);
    setTotalRentals(rentals);
    setTotalRevenue(revenue);
    setAverageRevenue(revenue / carRentalData.length);
  }, []);

  return (
    <Box sx={{ px: 4, py: 6, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Car Rental Dashboard
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Stack spacing={4}>
        {/* Statistics Section */}
        <Stack direction="row" spacing={4} justifyContent="space-between">
          <Card sx={{ boxShadow: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Rentals
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {totalRentals}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ boxShadow: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ${totalRevenue}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ boxShadow: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Avg. Revenue/Month
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                ${averageRevenue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Charts Section */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Monthly Rentals and Revenue
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={carRentalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="rentals" fill="#3F51B5" />
              <Bar yAxisId="right" dataKey="revenue" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Car Type Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={carTypeData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#3F51B5"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {carTypeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Stack>
    </Box>
  );
};

export default Dashboard;
