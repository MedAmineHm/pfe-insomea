import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, MantineProvider, Box } from "@mantine/core";
import "@mantine/core/styles.css";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import LoginPage from "views/examples/LoginPage.js";
import ForgotPasswordPage from "views/examples/ForgotPasswordPage";
import AcceptGoogleAuth from "views/examples/AcceptGoogleAuth";
import ResetPasswordPage from "views/examples/ResetPasswordPage";
import TerraBoard from "views/examples/screens/TerraBoard";

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

          <Route path="*" element={<Navigate to="/components" replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
