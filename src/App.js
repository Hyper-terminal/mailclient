import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Layout from "./components/Layout";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Routes>
        {isAuthenticated && (
          <Route path="/" element={<Navigate to="/home" />} />
        )}

        {!isAuthenticated && (
          <Route path="/" element={<Navigate to="/auth/signin" />} />
        )}

        {isAuthenticated && (
          <Route path="/">
            <Route path="home" element={<Layout />} />
          </Route>
        )}

        {!isAuthenticated && (
          <Route path="/auth">
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forget" element={<ForgetPassword />} />
          </Route>
        )}

        <Route path="*" element={<h1>No page found</h1>} />
      </Routes>
    </>
  );
};

export default App;
