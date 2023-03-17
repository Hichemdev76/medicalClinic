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
import InReview from "./inReview";

import LeaveForm from "./leaveForm";

const Leave = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useSelector((state) => state.global);

  const leaveType = {
    inReview: { type: "review", title: "Requests in Review" },
    paidLeave: { type: "paid", title: "Paid Leave" },
    unPaidLeave: { type: "unpaid", title: "unPaid Leave" },
    maternityLeave: { type: "maternal", title: "Maternity Leave" },
  };
  
  const [leaveT, setLeaveT] = useState(leaveType.inReview);
  return user.role !== "user" ? (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Leave Management"
        subtitle="Managing leaves for the employees"
      />
      {user.role === "serviceChef" ? (
        <>
          <Stack
            padding="1rem 0"
            spacing={2}
            width="90%"
            direction={isNonMobile ? "row" : "column"}
          >
            <Button
              onClick={() => {
                setLeaveT(leaveType.inReview);
              }}
              variant="contained"
            >
              InReview
            </Button>

            <Button
              onClick={() => {
                setLeaveT(leaveType.paidLeave);
              }}
              variant="contained"
            >
              Paid Leave
            </Button>
            <Button
              onClick={() => {
                setLeaveT(leaveType.unPaidLeave);
              }}
              variant="contained"
            >
              unPaid Leave
            </Button>
            <Button
              onClick={() => {
                setLeaveT(leaveType.maternityLeave);
              }}
              variant="contained"
            >
              Maternity Leave
            </Button>
          </Stack>
          <>
            {leaveT.type === "review" ? (
              <InReview />
            ) : (
              <Box
                width={isNonMobile ? "50%" : "93%"}
                p="3rem 4rem"
                m="1.5rem 0"
                borderRadius="1rem"
                backgroundColor={theme.palette.background.alt}
              >
                <Typography variant="h3" color={theme.palette.secondary[300]}>
                  {leaveT.title} Form
                </Typography>
                <LeaveForm leaveType={leaveT.type} setLeave={setLeaveT} />
              </Box>
            )}
          </>
        </>
      ) : (
        <InReview />
      )}
    </Box>
  ) : (
    <>Access Denied</>
  );
};

export default Leave;
