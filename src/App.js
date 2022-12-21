import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import InboxMail from "./components/Mail/MailItems/InboxMail";
import SentMail from "./components/Mail/MailItems/SentMail";
import ComposePage from "./pages/ComposePage";
import InboxPage from "./pages/InboxPage";
import SentPage from "./pages/SentPage";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Routes>
        {isAuthenticated && (
          <Route path="/" element={<Navigate to="/mail/inbox" />} />
        )}

        {!isAuthenticated && (
          <Route path="/" element={<Navigate to="/auth/signin" />} />
        )}

        {isAuthenticated && (
          <Route path="/mail">
            <Route path="sent" element={<SentPage />} />
            <Route path="compose" element={<ComposePage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="inbox/:mailId" element={<InboxMail />} />
            <Route path="sent/:mailId" element={<SentMail />} />
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
