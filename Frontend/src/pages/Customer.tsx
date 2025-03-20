import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import ModalCustomer from "../components/Modals/ModalCustomer";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 100 },
  {
    field: "fullName",
    headerName: "Full Name",
    description: "This column combines first and last names.",
    sortable: false,
    width: 200,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const Customer = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleAddCustomer = () => {
    console.log("Open Add Customer Modal");
    console.log(openModal);
    setOpenModal(true);
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          Customers
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddAlt1Icon />}
          onClick={handleAddCustomer}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Add Customer
        </Button>
      </Stack>

      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
          autoHeight={true}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "secondary.main",
              color: "primary",
            },
            "& .MuiDataGrid-footerContainer": {
              bgcolor: "primary.light",
            },
          }}
        />
      </Paper>

      {openModal && (
        <ModalCustomer openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </Box>
  );
};

export default Customer;
