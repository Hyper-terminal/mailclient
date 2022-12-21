import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const InboxMail = () => {
  const { mailId } = useParams();
  const inboxMail = useSelector((state) => state.mail.inboxMail);
  const foundMail = inboxMail[mailId];

  return (
    <Box textAlign='center' mt='14'>
      <Heading>{foundMail.from}</Heading>
      <Text color="green">{foundMail.subject}</Text>
      <Text color="blue">{foundMail.body}</Text>
    </Box>
  );
};

export default InboxMail;
