import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Users from "scenes/users";
import LoginPage from "scenes/login";
import AddUser from "scenes/addUser";
import User from "scenes/userProfile";
import Archives from "scenes/archives";
import Leave from "scenes/leave";
import AddService from "scenes/addService";
import Service from "scenes/service";
import OneLeave from "scenes/oneLeave";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.global.token);
  const isAuth = Boolean(token);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/login"
              element={
                isAuth ? <Navigate to="/dashboard" replace /> : <LoginPage />
              }
            />
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  isAuth ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuth ? <Dashboard /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/users"
                element={isAuth ? <Users /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/archives"
                element={
                  isAuth ? <Archives /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/congé"
                element={isAuth ? <Leave /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/congé/:leaveId"
                element={isAuth ? <OneLeave /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <User /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/add"
                element={
                  isAuth ? <AddUser /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/Service"
                element={
                  isAuth ? <Service /> : <Navigate to="/login" replace />
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
