import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  PointOfSaleOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  PieChartOutlined,
  AddCircleOutlineOutlined,
  UpdateOutlined,
  PeopleOutlineOutlined,
  PublicOutlined,
  Groups2Outlined,
  LocalPrintshopOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpg";

const adminNavItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "User Management",
    icon: null,
  },
  {
    text: "Add ",
    icon: <AddCircleOutlineOutlined />,
  },

  {
    text: "Users",
    icon: <PeopleOutlineOutlined />,
  },

  {
    text: "Services",
    icon: null,
  },
  {
    text: "Service",
    icon: <Groups2Outlined />,
  },

  {
    text: "Functionality",
    icon: null,
  },
  {
    text: "Leave",
    icon: <PieChartOutlined />,
  },
  {
    text: "Archives",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Installation",
    icon: <LocalPrintshopOutlined />,
  },
  {
    text: "Guidance",
    icon: <LocalPrintshopOutlined />,
  },
];

const serviceChefNavItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "User Management",
    icon: null,
  },
  {
    text: "Add ",
    icon: <AddCircleOutlineOutlined />,
  },

  {
    text: "Users",
    icon: <PeopleOutlineOutlined />,
  },
  {
    text: "Services",
    icon: null,
  },
  {
    text: "Service",
    icon: <Groups2Outlined />,
  },

  {
    text: "Functionality",
    icon: null,
  },
  {
    text: "Leave",
    icon: <PieChartOutlined />,
  },
  {
    text: "Archives",
    icon: <AdminPanelSettingsOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  let content = user.role === "admin" ? adminNavItems : serviceChefNavItems;
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap=".5rem">
                  <Typography variant="h4" fontWeight="bold">
                    MEDICLINIC
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {content.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 .5rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${text.split(" ").join("")}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box
            mt="auto"
            mb="0"
            ml="-20px"
            paddingBottom="1rem"
            // backgroundColor={theme.palette.background.alt}
          >
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={`${process.env.REACT_APP_BASE_URL + "/assets/profil.png"}`}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box
                textAlign="left"
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.firstName === undefined
                    ? ""
                    : user.firstName.toUpperCase()}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.affiliation === undefined ? "" : user.affiliation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
                onClick={() => navigate(`/profile/update/${user._id}`)}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
