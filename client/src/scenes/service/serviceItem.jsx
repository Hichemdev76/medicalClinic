import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetServiceQuery } from "state/api";

const ServiceItem = ({ name }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: service, isSuccess, isLoading } = useGetServiceQuery(name);

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

  let content;
  if (isSuccess) {
    content = (
      <Box
        mt="40px"
        height="60vh"
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
          loading={isLoading || !service.allUsers}
          getRowId={(row) => row._id}
          rows={service.allUsers || []}
          columns={columns}
          onCellClick={(data) => navigate(`/profile/${data.id}`)}
        />
      </Box>
    );
  } else content = <div>{name}</div>;
  return <div>{content}</div>;
};

export default ServiceItem;
