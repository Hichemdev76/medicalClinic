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
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useAddUserMutation, useGetAllServiceQuery } from "state/api";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  dateOfBirth: yup.string().required("required"),
  address: yup.string().required("required"),
  sex: yup.string().required("required"),
  status: yup.string().required("required"),
  level: yup.number().required("required"),
  jobTitle: yup.string().required("required"),
  affiliation: yup.string(),
  picturePath: yup.string(),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  address: "",
  sex: "",
  status: "",
  level: "",
  jobTitle: "",
  affiliation: "",
  picturePath: "",
  email: "",
  password: "",
};

const AddUserForm = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedDate, setSelectedDate] = useState("");

  const { data: services, isSuccess } = useGetAllServiceQuery();
  const [addUser] = useAddUserMutation();

  let checker = false;
  let content;
  if (isSuccess && services.length > 0) {
    let servicesList = services.map((s) => s.name);
    content = servicesList.map((service, index) => (
      <MenuItem key={index} value={service}>
        {service}
      </MenuItem>
    ));
    checker = true;
  }

  
  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);
    let res = await addUser(values);
    console.log(res)
    if (res.data.done) {
      onSubmitProps.resetForm();
      navigate("/users");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
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

            <FormControl sx={{ gridColumn: "span 1" }}>
              <InputLabel>Sex</InputLabel>
              <Select
                label="Sex"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sex}
                name="sex"
                error={Boolean(touched.sex) && Boolean(errors.sex)}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
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
            {checker && (
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel>Affiliation</InputLabel>
                <Select
                  label="Affiliation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.affiliation}
                  name="affiliation"
                  error={
                    Boolean(touched.affiliation) && Boolean(errors.affiliation)
                  }
                >
                  {content}
                  
                </Select>
              </FormControl>
            )}

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
              label="Level"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.level}
              name="level"
              error={Boolean(touched.level) && Boolean(errors.level)}
              helperText={touched.level && errors.level}
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
            {/* <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box> */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
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
};

export default AddUserForm;
