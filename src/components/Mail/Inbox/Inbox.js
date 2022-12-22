import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchMail from "../../../hooks/use-fetchMails";
import { mailActions } from "../../../store/mail-slice";
import { deleteMail, updateMarkRead } from "../mailApi";
import MailListItem from "../MailItems/MailListItem";

const Inbox = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const inboxMail = useSelector((state) => state.mail.inboxMail);
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  const { unreadCount, sendRequest: fetchInboxMails } = useFetchMail();

  useEffect(() => {
    const requestConfig = {
      url: `https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/${formattedEmail}/inboxMail.json`,
    };

    const interval = setInterval(() => {
      fetchInboxMails(requestConfig, true);
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchInboxMails, formattedEmail]);

  const deleteHandler = (formattedEmail, id) => {
    deleteMail(formattedEmail, id);
    dispatch(mailActions.deleteMail(id));
  };

  const clickHandler = (mail) => {
    console.log(mail);
    const mailObj = { ...mail };
    mailObj.markRead = true;
    updateMarkRead(formattedEmail, mail.id, mailObj);
    dispatch(mailActions.markInboxMailRead(mail.id));
    navigate(`/mail/inbox/${mail.id}`);
  };

  return (
    <Flex
      justifyContent="center"
      bgColor="#33206c"
      h="100vh"
      ml="200px"
      maxW="100vw"
      boxShadow="lg"
    >
      <Box
        mt="9"
        boxShadow="outline"
        w="90%"
        maxW="100%"
        p={[0, "3rem"]}
        rounded="md"
        bg="snow"
      >
        <Heading fontFamily="lobster">INBOX</Heading>
        <Text fontWeight="bold" color="pink.400">
          Unread Mails: {unreadCount}
        </Text>
        {!inboxMail && (
          <Heading textAlign="center">Your inbox is empty</Heading>
        )}

        {inboxMail &&
          Object.keys(inboxMail).map((mail) => (
            <MailListItem
              onClick={clickHandler}
              onDelete={deleteHandler}
              key={mail}
              mail={inboxMail[mail]}
            />
          ))}
      </Box>
    </Flex>
  );
};

export default Inbox;
