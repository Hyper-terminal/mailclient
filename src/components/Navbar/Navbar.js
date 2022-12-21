import { ChatIcon, UnlockIcon } from "@chakra-ui/icons";
import { Avatar, Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/auth/signin", { replace: true });
  };

  return (
    <Flex
      overflow="hidden"
      alignItems="center"
      flexDirection="column"
      p={5}
      height="100%"
      position="fixed"
      width="14rem"
      zIndex={100}
      bgColor="#E9EEF1"
    >
      <Box textAlign="center">
        <Avatar size="xl" />
        <Text fontWeight="700" mt={5}>
          SHERLOCK
        </Text>
        <Text color="blackAlpha.700">sherlock@gmail.com</Text>
      </Box>

      <Flex direction="column">
        <Link mt={10}>
          <ChatIcon />
          Inbox
        </Link>
        <Link mt={10}>Sent</Link>
        <Link mt={10}>Draft</Link>
        <Link mt={10}>About</Link>

        <Divider mt={10} bgColor="black" height={0.3} />

        <Link
          onClick={logoutHandler}
          mt={10}
          display="flex"
          alignItems="center"
        >
          <UnlockIcon boxSize={4} /> <Text>Logout</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
