import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchMail from "../../../hooks/use-fetchMails";
import { mailActions } from "../../../store/mail-slice";
import { deleteSentMail, updateSentMarkRead } from "../mailApi";
import MailListItem from "../MailItems/MailListItem";

const Sent = () => {
  const navigate = useNavigate();

  const sentMail = useSelector((state) => state.mail.sentMail);
  const dispatch = useDispatch();
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  const { unreadCount, sendRequest: fetchSentMails } = useFetchMail();

  useEffect(() => {
    const requestConfig = {
      url: `https://mailbox-64e91-default-rtdb.asia-southeast1.firebasedatabase.app/${formattedEmail}/sentMail.json`,
    };

    const interval = setInterval(() => {
      fetchSentMails(requestConfig, false);
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchSentMails, formattedEmail]);

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
