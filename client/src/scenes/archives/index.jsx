import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetArchivedUsersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const Archives = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isLoading } = useGetArchivedUsersQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "firstName",
      flex: 0.25,
    },
    {
      field: "lastName",
      headerName: "lastName",
      flex: 0.25,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "affiliation",
      headerName: "Affiliation",
      flex: 0.5,
    },
    {
      field: "level",
      headerName: "Level",
      flex: 0.25,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Archived Users" subtitle="List of All archived users" />
      <Box
        mt="40px"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          onCellClick={(data) => navigate(`/profile/${data.id}`)}
        />
      </Box>
    </Box>
  );
};

export default Archives;
