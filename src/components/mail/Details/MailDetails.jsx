import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Details = () => {
  const { mailId } = useParams();
  let inbox = false;

  if (window.location.pathname === `/mail/inbox/${mailId}`) inbox = true;

  let mail = "";
  let foundMail = "";

  if (inbox) {
    mail = useSelector((state) => state.mail.inboxMail);
    foundMail = mail[mailId];
  } else {
    mail = useSelector((state) => state.mail.sentMail);
    foundMail = mail[mailId];
  }

  return <div>{foundMail.from}</div>;
};

export default Details;
