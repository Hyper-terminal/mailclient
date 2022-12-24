import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import "./auth.css";
import { signUpRequest } from "./authApi";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);

    if (values.userPassword !== values.confirmPassword) {
      setIsLoading(false);

      setIsError("Password not matched");
      return;
    }
    const { response, data } = await signUpRequest(values);
    setIsLoading(false);

    if (!response.ok) {
      setIsError(data.error.message);
    } else {
      dispatch(authActions.login(data));
      navigate("/", { replace: true });
    }
  };

  const onFinishFailed = (errorInfo) => {
    setIsLoading(false);
    setIsError(null);
    console.log("Failed:", errorInfo);
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
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
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
            placeholder="Confirm Password"
            size="large"
          />
        </Form.Item>

        <Form.Item style={{ fontSize: "1.1rem" }}>
          <Button
            loading={isLoading}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Sign up
          </Button>{" "}
          Or <Link to="/auth/signin">Have an account? Login</Link>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Signup;
