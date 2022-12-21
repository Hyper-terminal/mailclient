import {
  Box,
  Divider,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mailActions } from "../../../store/mail-slice";
import { deleteMail, getInboxMail, updateMarkRead } from "../mailApi";

const Inbox = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inboxMail = useSelector((state) => state.mail.inboxMail);
  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);

  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  const clickHandler = (id) => {
    const mailObj = { ...inboxMail[id] };
    mailObj.markRead = true;
    updateMarkRead(formattedEmail, id, mailObj);
    dispatch(mailActions.markRead(id));
    navigate(`/mail/inbox/${id}`);
  };

  const deleteHandler = (id) => {
    deleteMail(formattedEmail, id);
    dispatch(mailActions.deleteMail(id));
  };

  useEffect(() => {
    const sendRequest = async () => {
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
    };

    sendRequest();
  }, [formattedEmail, dispatch]);

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
        <Text fontWeight="bold" color="pink.400">
          Unread Mails: {unreadCount}
        </Text>
        {!inboxMail && (
          <Heading textAlign="center">Your inbox is empty</Heading>
        )}

        {inboxMail &&
          Object.keys(inboxMail).map((mail) => {
            return (
              <SimpleGrid
                onClick={clickHandler.bind(null, mail)}
                borderRadius="lg"
                p="2"
                key={mail}
                mt="2"
                columns={2}
                spacing={2}
                cursor="pointer"
                _hover={{
                  backgroundColor: "blackAlpha.400",
                }}
              >
                <Flex
                  alignItems="center"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <Button
                    onClick={deleteHandler.bind(null, mail)}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                  <Box
                    w="2"
                    h="2"
                    ml="1"
                    borderRadius="full"
                    display="inline-block"
                    bgColor="blue"
                    mr="2.5"
                  ></Box>
                  {inboxMail[mail].from.slice(0, 40)}
                </Flex>
                <Flex
                  lineHeight="1"
                  alignItems="center"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <Divider
                    w="1"
                    mr="2.5"
                    bgColor="pink.400"
                    orientation="vertical"
                    display="inline-block"
                  />
                  {inboxMail[mail].body.slice(0, 40)}...
                </Flex>
              </SimpleGrid>
            );
          })}
      </Box>
    </Flex>
  );
};

export default Inbox;
