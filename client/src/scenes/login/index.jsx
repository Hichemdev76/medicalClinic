import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./form";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color={theme.palette.secondary[100]}>
          MediClinic
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "40%" : "93%"}
        p="3rem 4rem"
        m="3rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight={500} variant="h2" color={theme.palette.secondary[300]} >
        Login
      </Typography>
        <Form />
      </Box>
    </Box>
  );
};


export default Login;
