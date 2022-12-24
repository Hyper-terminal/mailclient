import { List } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchMail from "../../../hooks/useFetchMails";
import ListItem from "./ListItem";

const Sent = () => {
  const sentMail = useSelector((state) => state.mail.sentMail);
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  const { sendRequest: fetchSentMails } = useFetchMail();

  useEffect(() => {
    const requestConfig = {
      url: `https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/${formattedEmail}/sentMail.json`,
    };

    const interval = setInterval(() => {
      fetchSentMails(requestConfig, false);
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchSentMails, formattedEmail]);

  let myData = Object.keys(sentMail).map((key) => sentMail[key]);

  return (
    <List
      style={{ padding: "1rem" }}
      size="large"
      itemLayout="horizontal"
      dataSource={myData}
      renderItem={(item) => (
        <ListItem formattedEmail={formattedEmail} item={item} />
      )}
    />
  );
};
export default Sent;
