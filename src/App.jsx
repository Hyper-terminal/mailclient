import "antd/dist/reset.css";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgetPassword from "./components/auth/ForgetPassword";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Structure from "./components/Layout/Structure";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Structure>
        <Routes>
          {!isAuthenticated && (
            <Route path="/" element={<Navigate to="/auth/signin" />} />
          )}

          {isAuthenticated && (
            <Route path="/" element={<Navigate to="/mail/inbox" />} />
          )}

          {!isAuthenticated && (
            <Route path="/auth">
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forget" element={<ForgetPassword />} />
            </Route>
          )}

          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </Structure>
    </>
  );
}

export default App;
