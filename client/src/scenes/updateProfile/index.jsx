import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from 'components/Header';
import React from 'react'
import UpdateUserForm from './updateForm';

const UpdateProfile = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Update Profile" subtitle="Update profile information" />
        <Box
          width={isNonMobileScreens ? "100%" : "93%"}
          p="3rem 4rem"
          m="1.5rem auto"
          borderRadius="1rem"
          backgroundColor={theme.palette.background.alt}
        >
          <UpdateUserForm />
        </Box>
      </Box>)
}

export default UpdateProfile