import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useGetServiceQuery } from "state/api";
import dashboardPic from "assets/Setup-Analytics-bro.png";

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

function Dashboard() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { user } = useSelector((state) => state.global);
  const { data, isSuccess, isLoading } = useGetServiceQuery(user.affiliation);
  let totalNbrCard = "";
  if (isSuccess && user.role === "serviceChef") {
    totalNbrCard = (
      <Box
        borderRadius="10px"
        p="1rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography variant="h5" mb="10px" color={theme.palette.secondary[100]}>
          {user.affiliation} Has
        </Typography>
        <Typography
          variant="h2"
          color={theme.palette.secondary[300]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {data.service.workersIds.length} Active Workers
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem" width="70vw" display="flex" alignItems="start">
      <Box display="flex" flexWrap="wrap" gap="1rem">
        <Box
          borderRadius="10px"
          p="1rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography
            variant="h2"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Hi {capitalize(user.firstName)}
          </Typography>
          <Typography variant="h5" color={theme.palette.secondary[300]}>
            {user.role === "admin"
              ? "Administrator"
              : `Head of ${user.affiliation}`}
          </Typography>
        </Box>
        {user.role === "serviceChef" && totalNbrCard}
      </Box>
      {isNonMobileScreens && (
        <Box
          component="img"
          alt="dashboardPic"
          src={dashboardPic}
          height="85vh"
          // width="80%"
          p="4rem"
          sx={{ objectFit: "cover" }}
        />
      )}
    </Box>
  );
}

export default Dashboard;
