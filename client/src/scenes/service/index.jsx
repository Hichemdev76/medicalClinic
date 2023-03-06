import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllServiceQuery, useGetServiceQuery } from "state/api";
import AddServiceForm from "./addServiceForm";
import ServiceItem from "./serviceItem";

const Service = () => {
  const { user } = useSelector((state) => state.global.user);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const [service, setService] = useState("Add Service");
  const { data: services, isSuccess, isError } = useGetAllServiceQuery();
  let servicesList = ["Add Service"];

  if (isSuccess) {
    let serviceNames = [];
    services.map((service) => serviceNames.push(service.name));
    servicesList = [...serviceNames, ...servicesList];
  }

  let content;
  if (service === "Add Service") {
    content = (
      <Box
        width={isNonMobile ? "50%" : "93%"}
        p="3rem 4rem"
        m="1.5rem auto 1.5rem 0"
        borderRadius="1rem"
        backgroundColor={theme.palette.background.alt}
      >
        <>
          {isError && (
            <Typography fontSize="1.5rem">User is already assigned</Typography>
          )}
        </>

        <AddServiceForm />
      </Box>
    );
  } else {
    content = <ServiceItem name={service} />;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={service} subtitle="Overview on service section" />
      <Stack
        padding="1rem 0"
        spacing={2}
        width="90%"
        direction={isNonMobile ? "row" : "column"}
      >
        {servicesList.map((item, index) => (
          <Button
            variant="contained"
            m="10px"
            key={index}
            onClick={() => {
              setService(item);
            }}
          >
            {item}
          </Button>
        ))}
      </Stack>
      {content}
    </Box>
  );
};

export default Service;
