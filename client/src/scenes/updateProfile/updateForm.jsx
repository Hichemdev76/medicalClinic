// import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import {
  useAddUserMutation,
  useGetAllServiceQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "state/api";

const updateSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  dateOfBirth: yup.string().required("required"),
  address: yup.string().required("required"),
  status: yup.string().required("required"),
  jobTitle: yup.string().required("required"),
});

const UpdateUserForm = () => {
  const { userId } = useParams();
  const { data: user, isSuccess } = useGetUserQuery(userId);
  const initialValuesUpdate = {
    firstName: isSuccess ? user.firstName : " ",
    lastName: isSuccess ? user.lastName : "",
    dateOfBirth: isSuccess ? user.dateOfBirth : "",
    address: isSuccess ? user.address : "",
    status: isSuccess ? user.status : "",
    jobTitle: isSuccess ? user.jobTitle : "",
  };
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedDate, setSelectedDate] = useState("");
  const [updateUser] = useUpdateUserMutation();

  const handleFormSubmit = async (values, onSubmitProps) => {
    let res = await updateUser({ updates: values, id: userId });
    if (res.data.done) {
      onSubmitProps.resetForm();
      navigate(`/profile/${userId}`);
    }
  };

  let content;
  if (isSuccess) {
    content = (
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesUpdate}
        validationSchema={updateSchema}
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
          <form onSubmit={handleSubmit}>
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Date of Birth"
                  inputFormat="DD/MM/YYYY"
                  value={selectedDate}
                  onChange={(newValue) => {
                    if (Boolean(newValue)) {
                      setSelectedDate(newValue);
                      setFieldValue(
                        "dateOfBirth",
                        newValue.$d.toLocaleDateString()
                      );
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <TextField
                label="status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={Boolean(touched.status) && Boolean(errors.status)}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="Job Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobTitle}
                name="jobTitle"
                error={Boolean(touched.jobTitle) && Boolean(errors.jobTitle)}
                helperText={touched.jobTitle && errors.jobTitle}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={Boolean(touched.address) && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* BUTTONS */}
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
                {"REGISTER"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    );
  }

  return content;
};

export default UpdateUserForm;
