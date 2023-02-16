import logo from './logo.svg';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';
import * as authService from './auth.service';
import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';

function App() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(authService.getAccessToken());
  const handleLogin = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

   return (
    <>
      <CssBaseline />
      <Container sx={{ marginTop: 3 }}>
        <Routes>
          <Route
            path="/register"
            element={accessToken ? <Navigate to="/" /> : <RegistrationPage />}
          />
          <Route
            path="/login"
            element={
              accessToken ? (
                <Navigate to="/" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
