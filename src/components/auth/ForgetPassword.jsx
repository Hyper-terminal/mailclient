import { UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { forgetRequest } from "./authApi";
import { useState } from "react";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const onFinish = async (values) => {
    setIsLoading(true);
    const { response, data } = await forgetRequest(values.userEmail);
    setIsLoading(false);

    if (!response.ok) {
      setIsError(data.error.message);
    } else {
      setIsSuccess("Email successfully sent. Please check your email");
    }
  };

  const onFinishFailed = () => {
    setIsLoading(false);
  };

  const inputHandler = () => {
    setIsError(null);
    setIsSuccess(null);
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
        {isSuccess && <Alert message={isSuccess} type="success" showIcon />}
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

        <Form.Item>
          <Link to="/auth/signin" style={{ fontSize: "1.1rem" }}>
            Have an account? Login
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default ForgetPassword;
