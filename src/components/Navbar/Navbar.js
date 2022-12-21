import { UnlockIcon } from "@chakra-ui/icons";
import { Avatar, Box, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/auth/signin", { replace: true });
  };

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      p={5}
      height="100%"
      position="fixed"
      width="200px"
      bgColor="#E9EEF1"
      overflow="auto"
    >
      <Box textAlign="center">
        <Avatar size="xl" />
        <Text wordBreak="break-word" color="blackAlpha.700">
          {loggedInEmail}
        </Text>
      </Box>

      <Flex direction="column">
        <Link as={NavLink} to="/mail/compose" mt={10}>
          Compose
        </Link>
        <Link as={NavLink} to="/mail/inbox" mt={10}>
          Inbox
        </Link>
        <Link as={NavLink} to="/mail/sent" mt={10}>
          Sent
        </Link>

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
