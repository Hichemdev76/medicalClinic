import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Header from "components/Header";
import AddUserForm from "./addForm";

const AddUser = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Users" subtitle="Add new employee to the clinic" />
      <Box
        width={isNonMobileScreens ? "100%" : "93%"}
        p="3rem 4rem"
        m="1.5rem auto"
        borderRadius="1rem"
        backgroundColor={theme.palette.background.alt}
      >
        <AddUserForm />
      </Box>
    </Box>
  );
};

export default AddUser;
