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
import Service from "scenes/service";
import OneLeave from "scenes/oneLeave";
import UpdateProfile from "scenes/updateProfile";
import PdfViewer from "scenes/printFile";
import SinglePage from "scenes/printFile";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const { user, token } = useSelector((state) => state.global);
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
                  isAuth ? (
                    user.role !== "user" ? (
                      <Archives />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/leave"
                element={
                  isAuth ? (
                    user.role !== "user" ? (
                      <Leave />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/leave/:leaveId"
                element={
                  isAuth ? (
                    user.role !== "user" ? (
                      <OneLeave />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  isAuth ? (
                    user.role !== "user" ? (
                      <User />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/profile/update/:userId"
                element={
                  isAuth ? (
                    user.role !== "user" ? (
                      <UpdateProfile />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/add"
                element={
                  isAuth ? (
                    user.role !== "user" ? (
                      <AddUser />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/Service"
                element={
                  isAuth ? (
                    user.role !== "user" ? (
                      <Service />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/Installation"
                element={
                  isAuth ? (
                    user.role === "admin" ? (
                      <SinglePage
                        pdf={
                          process.env.REACT_APP_BASE_URL + "/assets/install.PDF"
                        }
                        name="install"
                      />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/guidance"
                element={
                  isAuth ? (
                    user.role === "admin" ? (
                      <SinglePage
                        pdf={
                          process.env.REACT_APP_BASE_URL +
                          "/assets/guidance.PDF"
                        }
                        name="guidance"
                      />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
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
