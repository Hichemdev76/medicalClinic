import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddLeaveMutation,
  useGetAllLeavesQuery,
  useGetAllUsersQuery,
  useGetLeaveQuery,
} from "state/api";
import * as yup from "yup";

const addLeaveSchema = yup.object().shape({
  leaveCause: yup.string().required("required"),
  startingDate: yup.string().required("required"),
  nbrOfDays: yup.number().required("required"),
  email: yup.string().email("invalid email").required("required"),
});

const initialValuesAddLeave = {
  leaveCause: "",
  startingDate: "",
  nbrOfDays: "",
  email: "",
};

const findUserByEmail = (users, email) => {
  for (let i in users) {
    if (users[i].email === email) return users[i];
  }
  return false;
};

const getDateFromString = (dateString) => {
  const dateComponents = dateString.split("/");
  const firstComponent = parseInt(dateComponents[0]);
  const secondComponent = parseInt(dateComponents[1]);
  const year = parseInt(dateComponents[2]);

  let month, day;

  // Determine the month and day based on the date format
  if (firstComponent <= 12) {
    month = firstComponent;
    day = secondComponent;
  } else {
    month = secondComponent;
    day = firstComponent;
  }

  // Create a new Date object using the components
  const date = new Date(year, month - 1, day);

  return date;
};

function addDays(date, days) {
  const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  return newDate;
}

const checkLeaveDays = (days, user) => user.payedLeaveDaysLeft > days;

const LeaveForm = ({ leaveType }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const creator = useSelector((state) => state.global.user);
  const [checkUser, setCheckUser] = useState(false);
  const [checkUserDays, setCheckUserDays] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [getEmail, setGetEmail] = useState("");
  const [user, setUser] = useState({});

  const [addLeave] = useAddLeaveMutation();
  const { data: users, isSuccess } = useGetAllUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      let user = findUserByEmail(users, getEmail);
      if (user) {
        setCheckUser(true);
        setUser(user);
      }
    }
  }, [getEmail]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (leaveType === "maternal") values["leaveCause"] = "Maternity Leave";
    if (isSuccess) {
      values["id"] = user._id;
      values["creator"] = creator._id;
      values["type"] = leaveType;

      let date = getDateFromString(values.startingDate);
      const newDate = addDays(date, values.nbrOfDays);

      values["expirationDate"] = newDate.toLocaleDateString();

      await addLeave(values);
      onSubmitProps.resetForm();
    }
  };

  

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesAddLeave}
      validationSchema={addLeaveSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} >
          <Box
            mt="30px"
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("email", e.target.value);
                setGetEmail(e.target.value);
              }}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />

            <Box gridColumn="span 2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  id="statingDate"
                  name="statingDate"
                  inputFormat="DD/MM/YYYY"
                  label="Starting Date"
                  value={selectedDate}
                  onChange={(newValue) => {
                    if (Boolean(newValue)) {
                      setSelectedDate(newValue);
                      setFieldValue(
                        "startingDate",
                        newValue.$d.toLocaleDateString()
                      );
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              label="Number Of Days"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("nbrOfDays", e.target.value);
                console.log(user)
                if (leaveType === "paid")
                  setCheckUserDays(checkLeaveDays(e.target.value, user));
                else if (user.sex === "Male" && leaveType === "maternal")
                  setCheckUserDays(false);
                else setCheckUserDays(true);
              }}
              value={values.nbrOfDays}
              name="nbrOfDays"
              error={Boolean(touched.nbrOfDays) && Boolean(errors.nbrOfDays)}
              helperText={touched.nbrOfDays && errors.nbrOfDays}
              sx={{ gridColumn: "span 2" }}
            />
            <>
              {leaveType !== "maternal" ? (
                <TextField
                  label="Leave Cause"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.leaveCause}
                  name="leaveCause"
                  error={
                    Boolean(touched.leaveCause) && Boolean(errors.leaveCause)
                  }
                  helperText={touched.leaveCause && errors.leaveCause}
                  sx={{ gridColumn: "span 2" }}
                />
              ) : (
                ""
              )}
            </>
          </Box>

          {/* BUTTONS */}
          <>
            {checkUser && checkUserDays && (
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    fontSize: "1rem",
                    fontWeight: "600",
                    "&:hover": {
                      color: palette.primary.main,
                      backgroundColor: palette.secondary[300],
                    },
                  }}
                >
                  {"Send To Review"}
                </Button>
              </Box>
            )}
          </>
        </form>
      )}
    </Formik>
  );
};

export default LeaveForm;
