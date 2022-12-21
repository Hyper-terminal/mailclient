import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../UI/Loader";

import authBackground from "../../assets/authBackground.png";
import { forgetRequest } from "./authApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const inputHandler = (event) => {
    setEmail((prev) => event.target.value);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    const { response, data } = await forgetRequest(email);
    setIsLoading(false);
    if (!response.ok) setIsError(data.error.message);
    setIsError("success");
  };

  return (
    <>
      {isLoading && <Loader />}
      <Flex
        justifyContent="center"
        alignItems="center"
        bgColor="#33206c"
        h="100vh"
        w={["100%", "100%"]}
        p={["0", "3"]}
      >
        <Box
          mt="9"
          width={["100%", "4xl"]}
          p={[0, "3rem"]}
          borderRadius="xl"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgImage={["", authBackground]}
          bgColor="#e3d9e7"
        >
          <form onSubmit={submitHandler}>
            <FormControl
              ml="auto"
              shadow="md"
              bgColor="#f4f0f5"
              width={["100%", "sm"]}
              height={{ base: "100%" }}
              p={[8, 10]}
              maxW="100%"
              borderRadius="3xl"
              isRequired
            >
              {isError && (
                <Alert status="error">
                  <AlertIcon /> {isError}
                </Alert>
              )}

              {isError === "success" && (
                <Alert status="success">
                  <AlertIcon />
                  Sent a reset link! Check your email, please.
                </Alert>
              )}

              <Heading>Forget Password</Heading>

              <FormLabel mt={5}>Email Address</FormLabel>
              <Input
                placeholder="Enter email"
                focusBorderColor="lime"
                variant="filled"
                type="email"
                name="email"
                value={email}
                onChange={inputHandler}
              />

              <Button
                _hover={{ backgroundColor: "#767178" }}
                pl="10"
                pr="10"
                bgColor="#3b3a3b"
                mt={7}
                color="white"
                type="submit"
              >
                Submit
              </Button>

              <Link
                as={NavLink}
                to="/auth/signin"
                color="#4f85e2"
                display="block"
                mt={4}
              >
                Go back to login page?
              </Link>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default ForgetPassword;
