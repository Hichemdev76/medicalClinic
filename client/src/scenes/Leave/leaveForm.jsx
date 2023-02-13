import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const LeaveForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  return (
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
        //   onBlur={handleBlur}
        //   onChange={handleChange}
        //   value={values.firstName}
        name="Email"
        //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}
        helperText={"Add User Email" /*touched.firstName && errors.firstName*/}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Starting Date"
        //   onBlur={handleBlur}
        //   onChange={handleChange}
        //   value={values.firstName}
        name="startingDate"
        //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}
        helperText={"Add a date" /*touched.firstName && errors.firstName*/}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Leave Duration"
        //   onBlur={handleBlur}
        //   onChange={handleChange}
        //   value={values.firstName}
        name="leaveDuration"
        //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}
        helperText={"Add duration" /*touched.firstName && errors.firstName*/}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Leave Cause"
        //   onBlur={handleBlur}
        //   onChange={handleChange}
        //   value={values.firstName}
        name="leaveCause"
        //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}
        helperText={"Add a Reason" /*touched.firstName && errors.firstName*/}
        sx={{ gridColumn: "span 2" }}
      />
      <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                // m: "2rem 0",
                p: ".8rem",
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
    </Box>
  );
};

export default LeaveForm;
