import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetAllServiceQuery,
  useGetAllUsersQuery,
  useGetServiceQuery,
} from "state/api";
import AddServiceForm from "./addServiceForm";
import ServiceItem from "./serviceItem";
import UpdateService from "./updateService";

const findUserByEmail = (users, email) => {
  for (let i in users) {
    if (users[i].email === email) return users[i];
  }
  return false;
};

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const dateReFormat = (date) => {
  let newDate = new Date(Date.parse(date));
  return newDate.toDateString();
};

const Service = () => {
  const { user: loggeduser } = useSelector((state) => state.global);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  const { data: services, isSuccess, isError } = useGetAllServiceQuery();
  const { data: users, isSuccess: isS } = useGetAllUsersQuery();

  const [checkUser, setCheckUser] = useState(false);
  const [getEmail, setGetEmail] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isSuccess) {
      let user = findUserByEmail(users, getEmail);
      if (user) {
        setCheckUser(true);
        setUser(user);
      } else {
        setCheckUser(false);
      }
    }
  }, [getEmail]);

  const [service, setService] = useState("Add Service");
  let servicesList = ["Add Service", "Add To Service"];

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
  } else if (service === "Add To Service" && servicesList.length > 2) {
    content = (
      <Box
        display="flex"
        justifyContent="space-around"
        flexDirection={isNonMobile ? "row" : "column"}
        width={"100%"}
        gap="30px"
      >
        <Box
          width={isNonMobile ? "50%" : "93%"}
          p="3rem 4rem"
          m="1.5rem auto 1.5rem 0"
          borderRadius="1rem"
          backgroundColor={theme.palette.background.alt}
        >
          <UpdateService setGetEmail={setGetEmail} />
        </Box>

        {checkUser ? <UserProfile user={user} theme={theme} /> : ""}
      </Box>
    );
  } else {
    content = <ServiceItem name={service} />;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={
          loggeduser.role === "serviceChef" ? loggeduser.affiliation : service
        }
        subtitle="Overview on service section"
      />
      <>
        {loggeduser.role === "admin" && (
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
        )}
      </>
      {loggeduser.role === "admin" ? (
        content
      ) : (
        <ServiceItem name={loggeduser.affiliation} />
      )}
    </Box>
  );
};

const UserProfile = ({ user, theme }) => {
  return (
    <Box
      p="3rem 4rem"
      m="1.5rem auto 1.5rem 0"
      borderRadius="1rem"
      backgroundColor={theme.palette.background.alt}
      display="flex"
      flexDirection="column"
      gap=".5rem"
    >
      <Typography
        variant="h2"
        color={theme.palette.secondary[300]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        User Info :
      </Typography>
      {/* <Typography variant="h5">{`Id Number : ${user._id}`}</Typography> */}
      <Typography variant="h5">{`Full Name : ${capitalize(
        user.lastName
      )} ${capitalize(user.firstName)}`}</Typography>
      <Typography variant="h5">{`Birth Date : ${user.dateOfBirth}`}</Typography>
      <Typography variant="h5">{`Sex : ${capitalize(user.sex)}`}</Typography>
      <Typography variant="h5">
        {`Status : ${capitalize(user.status)}`}
      </Typography>
      <Typography variant="h5">
        {`Email : ${capitalize(user.email)}`}
      </Typography>
      <Typography variant="h5">
        {`Address : ${capitalize(user.address)}`}
      </Typography>
      <Typography variant="h5">
        {`Job Title : ${capitalize(user.jobTitle)}`}
      </Typography>
      <Typography variant="h5">{`Level : ${user.level}`}</Typography>
      <Typography variant="h5">
        {`Affiliation : ${
          user.affiliation !== ""
            ? capitalize(user.affiliation)
            : "User not assigned to a service"
        }`}
      </Typography>
      <Typography variant="h5">
        {`Enrollment Day : ${dateReFormat(user.createdAt)}`}
      </Typography>
      <Typography variant="h5">
        {`Dates Of Leave Left : ${user.payedLeaveDaysLeft} days`}
      </Typography>
    </Box>
  );
};

export default Service;
