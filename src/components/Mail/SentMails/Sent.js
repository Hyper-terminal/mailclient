import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mailActions } from "../../../store/mail-slice";
import { deleteSentMail, getSentMail, updateSentMarkRead } from "../mailApi";
import MailListItem from "../MailItems/MailListItem";

const Sent = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const sentMail = useSelector((state) => state.mail.sentMail);
  const dispatch = useDispatch();
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  useEffect(() => {
    const sendRequest = async () => {
      const { response, data } = await getSentMail(formattedEmail);
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
          dispatch(mailActions.replaceSentMails(mailObjects));
        }
      }
    };

    sendRequest();
  }, [formattedEmail, dispatch]);

  const deleteHandler = (formattedEmail, id) => {
    deleteSentMail(formattedEmail, id);
    dispatch(mailActions.deleteSentMail(id));
  };

  const clickHandler = (mail) => {
    const mailObj = { ...mail };
    mailObj.markRead = true;
    updateSentMarkRead(formattedEmail, mail.id, mailObj);
    dispatch(mailActions.markSentMailRead(mail.id));
    navigate(`/mail/sent/${mail.id}`);
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
        <Heading fontFamily="lobster">SENT EMAIL BOX</Heading>
        <Text fontWeight="bold" color="pink.400">
          Unread Mails: {unreadCount}
        </Text>
        {!sentMail && <Heading textAlign="center">Your inbox is empty</Heading>}

        {sentMail &&
          Object.keys(sentMail).map((mail) => (
            <MailListItem
              onDelete={deleteHandler}
              onClick={clickHandler}
              key={mail}
              mail={sentMail[mail]}
            />
          ))}
      </Box>
    </Flex>
  );
};

export default Sent;
