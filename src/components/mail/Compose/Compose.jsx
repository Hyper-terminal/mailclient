import { BookOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../../store/mail-slice";
import { composeMail, inboxMail } from "../mailApi";

const { TextArea } = Input;

const Compose = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const dispatch = useDispatch();
  const open = useSelector((state) => state.mail.modalOpen);

  const modalCloseHandler = () => {
    dispatch(mailActions.toggleModel(false));
  };

  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);

  const submitHandler = async (values) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });

    const mailObj = {
      from: loggedInEmail,
      to: values.email,
      subject: values.subject,
      body: values.body,
      markRead: false,
    };

    const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");
    const formattedToEmail = values.email.replace("@", "").replace(".", "");

    const { response } = await composeMail(mailObj, formattedEmail);

    if (response.ok) {
      const { response } = await inboxMail(mailObj, formattedToEmail);

      if (response.ok) {
        messageApi.open({
          key,
          type: "success",
          content: "Sent Successfully",
          duration: 2,
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Compose"
        centered
        open={open}
        footer={null}
        onCancel={modalCloseHandler}
        width={1000}
      >
        <Form onFinish={submitHandler}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input
              size="large"
              type="mail"
              placeholder="Receiver address"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Divider />
          <Form.Item
            name="subject"
            rules={[{ required: true, message: "Please input subject!" }]}
          >
            <Input
              size="large"
              placeholder="Subject"
              prefix={<BookOutlined />}
            />
          </Form.Item>
          <Divider />
          <Form.Item
            name="body"
            rules={[{ required: true, message: "Please input body!" }]}
          >
            <TextArea rows={4} placeholder="Body" />
          </Form.Item>

          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Compose;
