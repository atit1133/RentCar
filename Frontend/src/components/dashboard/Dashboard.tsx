import { useState, useEffect } from "react";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
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
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

import { apiReportTotalRent, apiReportTotalRentals } from "../../api/api";

interface MonthlyRentalData {
  startDate: string; // ISO 8601 format (e.g., "2024-01-01T00:00:00")
  total: number;
}

interface MonthlyFullReport {
  Count: number;
  SumAmount: number;
  AvgAmount: number;
}

const COLORS = ["#4CAF50", "#FF5722", "#3F51B5", "#FFC107"];

const carTypeData = [
  { name: "Sedan", value: 400 },
  { name: "SUV", value: 300 },
  { name: "Hatchback", value: 200 },
  { name: "Truck", value: 100 },
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed

const Dashboard = () => {
  const [monthlyRentalData, setMonthlyRentalData] = useState<
    MonthlyRentalData[]
  >([]);
  const [fullReport, setFullReport] = useState<MonthlyFullReport | null>(null);

  const fetchMonthly = async () => {
    const response: MonthlyRentalData[] = await apiReportTotalRentals(
      `rential/report/${currentYear}/${currentMonth}`
    );

    const transformedReport: MonthlyFullReport = {
      Count: response.length,
      SumAmount: response.reduce((sum, item) => sum + item.total, 0),
      AvgAmount:
        response.length === 0
          ? 0
          : response.reduce((sum, item) => sum + item.total, 0) /
            response.length,
    };
    setFullReport(transformedReport);
    // setMonthlyRentalData(response);
  };

  const fetchMonthlyRentalData = async () => {
    try {
      const response: MonthlyRentalData[] = await apiReportTotalRent(
        "Rential/report"
      );
      // Sort the data by StartDate (chronologically)
      const sortedData = response.sort((a, b) => {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      });
      setMonthlyRentalData(sortedData);
    } catch (error) {
      console.error("Error fetching monthly rental data:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyRentalData();
    fetchMonthly();
  }, []);

  const carRentalData = monthlyRentalData
    .map((item) => ({
      month: new Date(item.startDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      rentals: item.total,
      revenue: item.total,
    }))
    .sort((a, b) => {
      const monthOrder: { [key: string]: number } = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };
      const monthA = a.month.substring(0, 3);
      const monthB = b.month.substring(0, 3);
      return monthOrder[monthA] - monthOrder[monthB];
    });

  return (
    <Box sx={{ px: 4, py: 6, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        Car Rental Dashboard
        {fullReport && ` [${currentMonth}/${currentYear}]`}
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
                {fullReport?.Count}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ boxShadow: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {fullReport?.SumAmount.toFixed(2) + " Bath"}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ boxShadow: 3, flex: 1 }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Avg. Revenue/Month
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {fullReport?.AvgAmount.toFixed(2) + " Bath"}
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
