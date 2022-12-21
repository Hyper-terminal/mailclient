import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { mailActions } from "../../store/mail-slice";

const Mail = () => {
  const { mailId } = useParams();
  const dispatch = useDispatch();

  const inboxMail = useSelector((state) => state.mail.inboxMail);

  const foundMail = inboxMail[mailId];
  dispatch(mailActions.markRead(mailId));
  return (
    <Box>
      <Heading>{foundMail.from}</Heading>
      <Text color="green">{foundMail.subject}</Text>
      <Text color="blue">{foundMail.body}</Text>
    </Box>
  );
};

export default Mail;
