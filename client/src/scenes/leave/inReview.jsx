import {
  CheckOutlined,
  DeleteOutlineOutlined,
  HelpOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllLeavesQuery, useUpdateLeaveMutation } from "state/api";

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const dateReFormat = (date) => {
  let newDate = new Date(Date.parse(date));
  return newDate.toDateString();
};

const InReview = () => {
  const theme = useTheme();
  const { data: leaves, isSuccess } = useGetAllLeavesQuery();
  const creator = useSelector((state) => state.global.user);

  let content;
  if (isSuccess) {
    content = leaves.map((leave, index) => {
      if (leave.creatorId === creator._id)
        if (leave.status === "accepted" || leave.status === "review")
          return (
            <Grid key={index} item xs={12} md={4}>
              <LeaveCard leave={leave} theme={theme} />
            </Grid>
          );
    });
  }

  return (
    <Grid container spacing={2}>
      {content}
    </Grid>
  );
};

const LeaveCard = ({ leave, theme }) => {
  const [updateLeave] = useUpdateLeaveMutation();
  const user = useSelector((state) => state.global.user);
  const navigate = useNavigate();
  return (
    <Box
      p="2rem 1.5rem"
      m="1.5rem 1.5rem 1.5rem 0"
      borderRadius="5px"
      minWidth="280px"
      backgroundColor={theme.palette.background.alt}
    >
      <Typography variant="h4">
        {capitalize(leave.user.firstName)} {capitalize(leave.user.lastName)}
      </Typography>
      <Typography mt="5px" variant="h5">
        By {leave.creator.lastName}
      </Typography>
      <Typography mt="10px" variant="h6">
        Leave Type : {capitalize(leave.type)}
      </Typography>
      <Typography variant="h6">
        Made At: {dateReFormat(leave.createdAt)}
      </Typography>
      <Typography variant="h6">Status: {leave.status}</Typography>
      <Stack
        pt="1rem"
        m="0 auto"
        gap="1rem"
        justifyContent="center"
        direction={"row"}
        width="100%"
      >
        <Button
          onClick={async () => {
            await updateLeave({
              id: leave._id,
              updateBody: { status: "refused" },
            });
          }}
          color="error"
          variant="contained"
        >
          <DeleteOutlineOutlined />
        </Button>
        <Button onClick={() => {navigate( `/congé/${leave._id}`)}} variant="contained">
          <HelpOutlineOutlined />
        </Button>
        {user.role === "admin" && (
          <Button
            onClick={async () => {
              await updateLeave({
                id: leave._id,
                updateBody: { status: "accepted" },
              });
            }}
            variant="contained"
            color="success"
          >
            <CheckOutlined />
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default InReview;
