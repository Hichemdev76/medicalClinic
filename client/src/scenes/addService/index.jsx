import { Box, useMediaQuery, useTheme } from "@mui/material";
import Header from "components/Header";
import AddServiceForm from "./serviceForm";
import React from "react";

const AddService = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Service" subtitle="Add new service to the clinic" />
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="3rem 4rem"
        m="1.5rem auto 1.5rem 0"
        borderRadius="1rem"
        backgroundColor={theme.palette.background.alt}
      >
        <AddServiceForm />
      </Box>
    </Box>
  );
};

export default AddService;
