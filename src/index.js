import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, MantineProvider, Box } from "@mantine/core";
import "@mantine/core/styles.css";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import Index from "screens/Test";
import LandingPage from "screens/Test/views/LandingPage";
import RegisterPage from "screens/Test/views/RegisterPage";
import ProfilePage from "screens/Test/views/ProfilePage";
import LoginPage from "screens/Test/views/LoginPage";
import ForgotPasswordPage from "screens/Test/views/ForgotPasswordPage";
import AcceptGoogleAuth from "screens/Test/views/AcceptGoogleAuth";
import ResetPasswordPage from "screens/Test/views/ResetPasswordPage";
import TerraBoard from "screens/TerraBoard";

const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route
            path="/forgot-password/:email"
            element={<ForgotPasswordPage />}
          />
          <Route path="/accept-google-auth" element={<AcceptGoogleAuth />} />
          <Route
            path="/reset-password/:email"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/board"
            element={
              <Box id="board">
                <TerraBoard />
              </Box>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
