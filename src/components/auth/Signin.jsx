import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import "./auth.css";
import { loginRequest } from "./authApi";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);

    const { response, data } = await loginRequest(values);
    setIsLoading(false);

    if (!response.ok) {
      setIsError(data.error.message);
    } else {
      dispatch(authActions.login(data));
      navigate("/", { replace: true });
    }
  };

  const onFinishFailed = () => {
    setIsLoading(false);
  };

  const inputHandler = () => {
    setIsError(null);
  };

  return (
    <Content>
      <Form
        size="large"
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {isError && <Alert message={isError} type="error" showIcon />}

        <Form.Item
          name="userEmail"
          label="Email Address"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            size="large"
            onChange={inputHandler}
            prefix={<UserOutlined />}
            placeholder="Email address"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="userPassword"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            onChange={inputHandler}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Link to="/auth/forget" style={{ fontSize: "1.1rem" }}>
            Forgot password ?
          </Link>
        </Form.Item>

        <Form.Item style={{ fontSize: "1.1rem" }}>
          <Button
            loading={isLoading}
            onChange={inputHandler}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Sign in
          </Button>{" "}
          Or <Link to="/auth/signup">register now!</Link>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Signin;
