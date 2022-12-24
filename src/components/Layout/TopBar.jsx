import { AntDesignOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const { Header, Content } = Layout;

const TopBar = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Header
      style={{
        padding: 0,
      }}
    >
      <Content
        style={{
          textTransform: "uppercase",
          color: "white",
          textAlign: "center",
          fontSize: "3rem",
        }}
      >
        <Avatar size="large" icon={<AntDesignOutlined />} />
        {!isAuthenticated && "Login"}
        {isAuthenticated && props.title}
        {isAuthenticated && !props.title && "Inbox"}
        <Avatar size="large" icon={<AntDesignOutlined />} />
      </Content>
    </Header>
  );
};
export default TopBar;
