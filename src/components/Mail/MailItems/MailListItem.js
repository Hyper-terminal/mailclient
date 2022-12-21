import {
  Box,
  Button,
  Divider,
  Flex, Stack
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const MailListItem = (props) => {
  const mail = props.mail;

  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);

  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  const clickHandler = () => {
    props.onClick(mail);
  };

  const deleteHandler = () => {
    props.onDelete(formattedEmail, mail.id);
  };

  return (
    <Stack direction="row" key={mail} mt="2" columns={2} spacing={2}>
      <Button w="5px" onClick={deleteHandler} colorScheme="red">
        X
      </Button>
      <Flex
        justifyContent="space-between"
        borderRadius="lg"
        direction="row"
        p="2"
        w="100%"
        onClick={clickHandler}
        _hover={{
          backgroundColor: "blackAlpha.400",
          cursor: "pointer",
        }}
      >
        <Flex alignItems="center" overflow="hidden" textOverflow="ellipsis">
          <Box
            w="2"
            h="2"
            ml="1"
            borderRadius="full"
            display="inline-block"
            bgColor="blue"
            mr="2.5"
          ></Box>
          {mail.from.slice(0, 40)}
        </Flex>
        <Flex
          mr="80"
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
          {mail.body.slice(0, 40)}...
        </Flex>
      </Flex>
    </Stack>
  );
};

export default MailListItem;
