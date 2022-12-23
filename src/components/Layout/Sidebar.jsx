import {
  LockTwoTone,
  MailTwoTone,
  PlusCircleTwoTone,
  RocketTwoTone,
  UnlockTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Divider, Layout, Menu } from "antd";
import Avatar from "antd/es/avatar/avatar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import "./Sidebar.css";

const { Sider } = Layout;

const Sidebar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/", { replace: true });
  };

  return (
    <Sider breakpoint="md" collapsedWidth="0" style={{ minHeight: "100vh" }}>
      <div style={{ textAlign: "center", fontSize: "1.2rem" }}>
        {/* Avatar in sidebar */}

        {loggedInEmail && isAuthenticated && (
          <div className="sidebar__avatar">
            <Avatar size={100} icon={<UserOutlined />} />
            <p>{loggedInEmail}</p>
          </div>
        )}

        {/* compose button */}
        {isAuthenticated && (
          <Button
            onClick={() => {
              props.onTitleChange("compose");
              navigate("/mail/compose");
            }}
            size="large"
            style={{ marginTop: "3rem" }}
          >
            <PlusCircleTwoTone />
            Compose
          </Button>
        )}

        <Divider />
        {isAuthenticated && (
          <Menu
            style={{ fontSize: "1.2rem" }}
            theme="dark"
            defaultSelectedKeys="1"
            items={[
              {
                key: "1",
                icon: <Badge count={0} size="small" />,
                label: (
                  <Link
                    to="/mail/inbox"
                    onClick={() => {
                      props.onTitleChange("inbox");
                    }}
                  >
                    <MailTwoTone /> Inbox
                  </Link>
                ),
                style: { paddingRight: "2rem" },
              },
              {
                key: "2",
                icon: <Badge count={0} size="small" />,
                label: (
                  <Link
                    to="/mail/sent"
                    onClick={() => {
                      props.onTitleChange("sent");
                    }}
                  >
                    <RocketTwoTone /> Sent
                  </Link>
                ),
                style: { paddingRight: "2rem" },
              },
            ]}
          />
        )}

        <Divider />

        {isAuthenticated && (
          <div onClick={logoutHandler} className="sidebar__logout">
            <LockTwoTone /> Logout
          </div>
        )}

        {!isAuthenticated && (
          <div onClick={logoutHandler} className="sidebar__logout">
            <UnlockTwoTone /> Login
          </div>
        )}
      </div>
    </Sider>
  );
};

export default Sidebar;
