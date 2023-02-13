import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import React from "react";
import LeaveForm from "./leaveForm";

const Leave = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Leave Management"
        subtitle="Managing leaves for the employees"
      />
      <Stack
        padding="1rem 0"
        spacing={2}
        width="90%"
        direction={isNonMobile ? "row" : "column"}
      >
        <Button variant="contained">Payed Leave</Button>
        <Button variant="contained">unPayed Leave</Button>
        <Button variant="contained">Maternity Leave</Button>
      </Stack>
      <Box
        width={isNonMobile ? "100%" : "93%"}
        p="3rem 4rem"
        m="1.5rem auto"
        borderRadius="1rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography variant="h3" color={theme.palette.secondary[300]}>
          Leave Info Form
        </Typography>
        <LeaveForm />
      </Box>
    </Box>
  );
};

export default Leave;
