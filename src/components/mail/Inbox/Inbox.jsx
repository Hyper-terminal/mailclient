import { List } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchMail from "../../../hooks/useFetchMails";
import ListItem from "./ListItem";

const Inbox = () => {
  const inboxMail = useSelector((state) => state.mail.inboxMail);
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  const { sendRequest: fetchInboxMails } = useFetchMail();

  useEffect(() => {
    const requestConfig = {
      url: `https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/${formattedEmail}/inboxMail.json`,
    };

    const interval = setInterval(() => {
      fetchInboxMails(requestConfig, true);
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchInboxMails, formattedEmail]);

  let myData = Object.keys(inboxMail).map((key) => inboxMail[key]);

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
export default Inbox;
