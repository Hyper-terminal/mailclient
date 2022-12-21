import {
  Link,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { authActions } from "../../store/auth-slice";
import { loginRequest } from "./authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authBackground from "../../assets/authBackground.png";
import { Alert } from "@chakra-ui/react";
import { AlertIcon } from "@chakra-ui/react";
import Loader from "../UI/Loader";
import { NavLink } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const inputHandler = (event) => {
    setIsError(null);
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    if (formData.userEmail === "" || formData.userPassword === "") {
      setIsLoading(false);
      setIsError("All fields are required");
      return;
    }

    // login request
    try {
      const { response, data } = await loginRequest(formData);

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(data.error.message);
      } else {
        dispatch(authActions.login(data));
        navigate("/", { replace: true });
      }
    } catch (err) {
      setIsError(err);
    }
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

              <Heading>Sign in</Heading>

              <FormLabel mt={5}>Email Address</FormLabel>
              <Input
                placeholder="Enter email"
                focusBorderColor="lime"
                variant="filled"
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={inputHandler}
              />

              <FormLabel mt={5}>Password </FormLabel>
              <Input
                placeholder="Enter passowrd"
                focusBorderColor="lime"
                variant="filled"
                type="password"
                name="userPassword"
                value={formData.userPassword}
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
                Sign in
              </Button>

              <Link
                as={NavLink}
                to="/auth/forget"
                color="#4f85e2"
                mt="4"
                display="block"
              >
                Forgot password?
              </Link>
              <Link
                as={NavLink}
                to="/auth/signup"
                color="#4f85e2"
                mt="2"
                display="block"
              >
                No account? Sign up
              </Link>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
