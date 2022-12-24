import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Descriptions, Divider } from "antd";
import { Content } from "antd/es/layout/layout";

const SentMail = () => {
  const { mailId } = useParams();

  let mail = "";
  let foundMail = "";

  mail = useSelector((state) => state.mail.sentMail);
  foundMail = mail[mailId];

  return (
    <Content style={{ padding: "3rem" }}>
      <Descriptions title="Basic Info">
        <Descriptions.Item label="Email">{foundMail.to}</Descriptions.Item>
        <Descriptions.Item label="Subject">
          {foundMail.subject}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="MAIN INFO">
        <Descriptions.Item>{foundMail.body}</Descriptions.Item>
      </Descriptions>
    </Content>
  );
};

export default SentMail;
