import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./form";
import illustration from "assets/medical-clinic-illustration.png";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box display="flex" alignItems="center">
      {isNonMobileScreens ?<Box
        component="img"
        alt="illustration"
        src={illustration}
        height="40%"
        width="60%"
        p="4rem"
        sx={{ objectFit: "cover" }}
      />:""}
      
      <Box
        width={isNonMobileScreens ? "40%" : "100%"}
        p="3rem 4rem"
        m="0 0 0 auto"
        height="100vh"
        backgroundColor={theme.palette.background.alt}
      >
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="0 6% 1rem"
          textAlign="center"
        >
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color={theme.palette.secondary[100]}
          >
            MediClinic
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          height="70vh"
          justifyContent="center"
        >
          <Typography
            fontWeight={500}
            variant="h2"
            color={theme.palette.secondary[300]}
          >
            Login
          </Typography>
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
