import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  useGetAllServiceQuery,
  useGetAllUsersQuery,
  useUpdateServiceMutation,
} from "state/api";
import { useState } from "react";

const serviceSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  role: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  role: "",
};

const UpdateService = ({ setGetEmail }) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { data: services, isSuccess } = useGetAllServiceQuery();

  const [updateService] = useUpdateServiceMutation();

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
    let res = await updateService(values);
    console.log(res);
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={serviceSchema}
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
            {checker && (
              <FormControl sx={{ gridColumn: "span 4" }}>
                <InputLabel>Name</InputLabel>
                <Select
                  label="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                >
                  {content}
                </Select>
              </FormControl>
            )}
            <TextField
              label="User toAdd Email"
              onBlur={handleBlur}
              onChange={(e) => {
                setFieldValue("email", e.target.value);
                setGetEmail(e.target.value);
              }}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <FormControl sx={{ gridColumn: "span 4" }}>
              <InputLabel>Role</InputLabel>
              <Select
                label="role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={Boolean(touched.role) && Boolean(errors.role)}
              >
                <MenuItem value={"serviceChef"}>Service Chef</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
              </Select>
            </FormControl>
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
              {"ADD SERVICE"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default UpdateService;
