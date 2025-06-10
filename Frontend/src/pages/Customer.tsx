import { Box, Button, Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { useState, useEffect, useContext } from "react";
import ModalCustomer from "../components/Modals/ModalCustomer";
import AppContext from "../AppContext";

interface UserData {
  userId: number;
  name: string;
  email: string;
  password?: string; // Optional, as it might not be needed in the frontend
  role: string;
}

const Customer = () => {
  const { handleLogout } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [rowsTable, setRowsTable] = useState<UserData[]>([]);

  const fetchRows = async () => {
    try {
      const response = await fetch("http://localhost:5297/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token from localStorage
        },
      });
      if (!response.ok) {
        handleLogout(); // Logout if the response is not ok
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: UserData[] = await response.json();
      // Rename userId to id
      const rowsWithId = data.map((user) => ({
        ...user,
        id: user.userId, // Rename userId to id
      }));
      console.log(rowsWithId);
      return rowsWithId;
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return an empty array in case of error
    }
  };

  const fetchDeleteRow = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5297/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token from localStorage
        },
      });

      if (!response.ok) {
        handleLogout(); // Logout if the response is not ok
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      return response.ok;
    } catch (error: any) {
      console.error("Delete failed:", error);
      throw error;
    }
  };

  const refreshDataGrid = async () => {
    const data = await fetchRows();
    setRowsTable(data);
  };

  useEffect(() => {
    refreshDataGrid();
  }, []);

  const handleAddCustomer = () => {
    console.log("Open Add Customer Modal");
    console.log(openModal);
    setOpenModal(true);
  };

  const handleDeleteClick = async (id: GridRowId) => {
    try {
      await fetchDeleteRow(Number(id));
      refreshDataGrid();
    } catch (error) {
      console.error("Failed to delete row:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "role", headerName: "Role", type: "string", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="error"
          />,
        ];
      },
    },
  ];

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
          rows={rowsTable}
          columns={columns}
          // paginationModel={{ pageSize: 5, page:  }}
          pagination
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
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
        <ModalCustomer
          openModal={openModal}
          refreshData={refreshDataGrid}
          setOpenModal={setOpenModal}
        />
      )}
    </Box>
  );
};

export default Customer;
