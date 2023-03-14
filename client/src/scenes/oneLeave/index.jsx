import { useTheme } from "@emotion/react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Header from "components/Header";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetLeaveQuery, useUpdateLeaveMutation } from "state/api";

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const dateReFormat = (date) => {
  let newDate = new Date(Date.parse(date));
  return newDate.toDateString();
};

const OneLeave = () => {
  const theme = useTheme();
  const [updateLeave] = useUpdateLeaveMutation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const loggedUser = useSelector((state) => state.global.user);
  const { leaveId } = useParams();
  const { data, isSuccess } = useGetLeaveQuery(leaveId);
  let content = false;
  let leave, user;
  if (isSuccess) {
    user = data.user;
    leave = data.leave;
    content = true;
    console.log(leave, user);
  }
  return (
    <Box m="1.5rem 5rem">
      <Box
        display="flex"
        justifyContent="space-around"
        flexDirection={isNonMobile ? "row" : "column"}
        width={isNonMobile ? "60%" : "100%"}
        gap="30px"
      >
        {content && (
          <>
            <Box
              display="flex"
              alignItems="center"
              gap="30px"
              justifyContent={isNonMobile ? "none" : "space-between"}
              flexDirection={isNonMobile ? "column" : "row"}
            >
              <Box
                component="img"
                alt="profile"
                src={`${
                  process.env.REACT_APP_BASE_URL + "/assets/" + user.picturePath
                }`}
                height="120px"
                width="120px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />

              {leave.status!=="refused"&&(<Stack spacing={2} width="160px" direction="column">
                {loggedUser.role ===
                  "admin"&&(
                    <Button variant="outlined" color="success" onClick={async () => {
              await updateLeave({
                id: leave._id,
                updateBody: { status: "accepted" },
              });
            }}>
                      Accept
                    </Button>
                  )}
                {(loggedUser._id === leave.creatorId || loggedUser.role === "admin") && (
                  <Button onClick={async () => {
              await updateLeave({
                id: leave._id,
                updateBody: { status: "refused" },
              });
            }} variant="contained" color="error">
                    Refuse
                  </Button>
                )}
              </Stack>)}
            </Box>
            <Box>
              <Header
                title={`${capitalize(user.firstName)} ${capitalize(
                  user.lastName
                )}`}
                subtitle={`role : ${user.role}`}
              />
              <Box
                m="2rem 0"
                backgroundColor={theme.palette.background.alt}
                borderRadius="10px"
                //width={isNonMobile ? "70%" : "90%"}
                padding="1rem"
                display="flex"
                gap="1rem"
                flexDirection="column"
              >
                <Typography
                  variant="h2"
                  color={theme.palette.secondary[300]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Profile Info :
                </Typography>
                <Typography variant="h5">
                  {`Id Number : ${user._id}`}
                </Typography>
                <Typography variant="h5">
                  {`Birth Date : ${user.dateOfBirth}`}
                </Typography>
                <Typography variant="h5">
                  {`Sex : ${capitalize(user.sex)}`}
                </Typography>
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
                  {`Affiliation : ${capitalize(user.affiliation)}`}
                </Typography>
                <Typography variant="h5">
                  {`Enrollment Day : ${dateReFormat(user.createdAt)}`}
                </Typography>

                <Typography variant="h5">
                  {`Dates Of Leave Left : ${user.payedLeaveDaysLeft} days`}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                m={isNonMobile ? "6rem 0" : "1rem 0"}
                backgroundColor={theme.palette.background.alt}
                borderRadius="10px"
                //width={isNonMobile ? "70%" : "90%"}
                padding="1rem"
                display="flex"
                gap="1rem"
                flexDirection="column"
              >
                <Typography
                  variant="h2"
                  color={theme.palette.secondary[300]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Leave Info :
                </Typography>
                <Typography variant="h5">
                  {`Id Number : ${leave._id}`}
                </Typography>
                <Typography variant="h5">{`Type : ${leave.type}`}</Typography>
                <Typography variant="h5">
                  {`Status : ${leave.status}`}
                </Typography>
                <Typography variant="h5">
                  {`Starting Date : ${leave.startingDate}`}
                </Typography>
                <Typography variant="h5">
                  {`Expiration Date : ${leave.expirationDate}`}
                </Typography>
                <Typography variant="h5">
                  {`Leave Duration : ${leave.nbrOfDays} days`}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default OneLeave;
