import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mailActions } from "../../../store/mail-slice";
import { deleteMail, getInboxMail, updateMarkRead } from "../mailApi";
import MailListItem from "../MailItems/MailListItem";

const Inbox = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const inboxMail = useSelector((state) => state.mail.inboxMail);
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  const getEmails = useCallback(async () => {
    const { response, data } = await getInboxMail(formattedEmail);
    if (response.ok) {
      if (data) {
        const mailObjects = {};
        let count = 0;

        for (let key in data) {
          const mailObj = data[key];
          mailObj.id = key;
          if (mailObj.markRead === false) count++;
          mailObjects[key] = mailObj;
        }
        setUnreadCount(count);
        dispatch(mailActions.replaceEmails(mailObjects));
      }
    }
  }, [formattedEmail, dispatch]);

  useEffect(() => {
    setInterval(() => {
      getEmails();
    }, 2000);
  }, [getEmails]);

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
