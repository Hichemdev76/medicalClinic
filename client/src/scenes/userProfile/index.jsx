import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserQuery, useUpdateUserRoleMutation } from "state/api";
import Header from "components/Header";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { userId } = useParams();
  const { user: loggedUser, token } = useSelector((state) => state.global);
  const { data, isSuccess } = useGetUserQuery(userId);
  const [updateUser] = useUpdateUserRoleMutation();

  let user = undefined;
  if (isSuccess) user = data;

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const dateReFormat = (date) => {
    let newDate = new Date(Date.parse(date));
    return newDate.toDateString();
  };

  // const handleDelete = async () => {
  //   let response = await fetch(
  //     `${process.env.REACT_APP_BASE_URL}/users/archive/${userId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   navigate("/archives");
  //   console.log(data);
  // };

  const update = async () => {
    let res = await updateUser({ updates: { role: "user" }, id: userId });
    if (userId === loggedUser._id)
      dispatch(
        setLogin({
          user: res.data,
          token: token,
        })
      );
  };

  return (
    <Box m="1.5rem 5rem">
      <Box
        display="flex"
        justifyContent="space-around"
        flexDirection={isNonMobile ? "row" : "column"}
        width={isNonMobile ? "60%" : "100%"}
        gap="30px"
      >
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
            src={
              user !== undefined
                ? `${
                    process.env.REACT_APP_BASE_URL +
                    "/assets/" +
                    user.picturePath
                  }`
                : ""
            }
            height="120px"
            width="120px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          <>
            {user !== undefined && !user.isArchived ? (
              <Stack spacing={2} width="160px" direction="column">
                <Button
                  onClick={
                    // updateUser({ updates: { role: "user" }, id: userId })
                    async () => {
                      update();
                    }
                  }
                  variant="outlined"
                  sx={{ color: theme.palette.secondary[300] }}
                >
                  Promote To Admin
                </Button>
                <Button variant="outlined" sx={{ color: "white" }}>
                  Update
                </Button>
                <Button
                  onClick={() => {
                    updateUser({ updates: { isArchived: true }, id: userId });
                  }}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Stack>
            ) : (
              ""
            )}
          </>
        </Box>
        <Box>
          <Header
            title={`${user !== undefined ? capitalize(user.firstName) : ""} ${
              user !== undefined ? capitalize(user.lastName) : ""
            }`}
            subtitle={`role : ${user !== undefined ? user.role : ""}`}
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
              {`Id Number : ${user !== undefined ? user._id : ""}`}
            </Typography>
            <Typography variant="h5">
              {`Birth Date : ${user !== undefined ? user.dateOfBirth : ""}`}
            </Typography>
            <Typography variant="h5">
              {`Sex : ${user !== undefined ? capitalize(user.sex) : ""}`}
            </Typography>
            <Typography variant="h5">
              {`Status : ${user !== undefined ? capitalize(user.status) : ""}`}
            </Typography>
            <Typography variant="h5">
              {`Email : ${user !== undefined ? capitalize(user.email) : ""}`}
            </Typography>
            <Typography variant="h5">
              {`Address : ${
                user !== undefined ? capitalize(user.address) : ""
              }`}
            </Typography>
            <Typography variant="h5">
              {`Job Title : ${
                user !== undefined ? capitalize(user.jobTitle) : ""
              }`}
            </Typography>
            <Typography variant="h5">
              {`Level : ${user !== undefined ? user.level : ""}`}
            </Typography>
            <Typography variant="h5">
              {`Affiliation : ${
                user !== undefined ? capitalize(user.affiliation) : ""
              }`}
            </Typography>
            <Typography variant="h5">
              {`Enrollment Day : ${
                user !== undefined ? dateReFormat(user.createdAt) : ""
              }`}
            </Typography>

            <>
              {user !== undefined && user.isArchived ? (
                <>
                  <Typography variant="h5">
                    {`Last Day at Work: ${
                      user !== undefined ? dateReFormat(user.updatedAt) : ""
                    }`}
                  </Typography>
                  <Typography variant="h5">
                    {user.isArchived ? "This user is Archived" : ""}
                  </Typography>
                </>
              ) : (
                <Typography variant="h5">
                  {`Dates Of Leave Left : ${
                    user !== undefined ? user.payedLeaveDaysLeft : ""
                  } days`}
                </Typography>
              )}
            </>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
