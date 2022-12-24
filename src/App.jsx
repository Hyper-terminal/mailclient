import "antd/dist/reset.css";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Structure from "./components/Layout/Structure";
import Spinner from "./components/Loader/Spinner";
import NotFound from "./components/NotFound";
import { ConfigProvider, theme } from "antd";
import { FloatButton } from "antd";
import { BulbOutlined } from "@ant-design/icons";

const InboxMail = React.lazy(() =>
  import("./components/mail/Details/InboxMail")
);
const SentMail = React.lazy(() => import("./components/mail/Details/SentMail"));
const Inbox = React.lazy(() => import("./components/mail/Inbox/Inbox"));
const Sent = React.lazy(() => import("./components/mail/Sent/Sent"));
const Signin = React.lazy(() => import("./components/auth/Signin"));
const Signup = React.lazy(() => import("./components/auth/Signup"));
const ForgetPassword = React.lazy(() =>
  import("./components/auth/ForgetPassword")
);

const { darkAlgorithm, defaultAlgorithm } = theme;

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const themeToggler = () => {
    setThemeMode((prev) => {
      if (prev === "light") {
        return "dark";
      } else return "light";
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "light" ? defaultAlgorithm : darkAlgorithm,
      }}
    >
      <FloatButton
        onClick={themeToggler}
        type="primary"
        icon={<BulbOutlined />}
        tooltip={<div>Theme Toggler</div>}
      />
      <Suspense fallback={<Spinner />}>
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

            {isAuthenticated && (
              <Route path="/mail">
                <Route path="inbox" element={<Inbox />} />
                <Route path="sent" element={<Sent />} />
                <Route path="inbox/:mailId" element={<InboxMail />} />
                <Route path="sent/:mailId" element={<SentMail />} />
              </Route>
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Structure>
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
