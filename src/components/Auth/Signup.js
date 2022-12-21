import {
  Link,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import authBackground from "../../assets/authBackground.png";
import { authActions } from "../../store/auth-slice";
import Loader from "../UI/Loader";
import { signUpRequest } from "./authApi";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState("");
  const [isError, setIsError] = useState("");

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

    if (
      formData.userEmail === "" ||
      formData.userPassword === "" ||
      formData.confirmPassword === ""
    ) {
      setIsLoading(false);
      setIsError("All fields are required");
      return;
    }

    if (formData.userPassword !== formData.confirmPassword) {
      setIsLoading(false);
      setIsError("Password not matched");
      return;
    }

    const { response, data } = await signUpRequest(formData);

    if (!response.ok) {
      setIsLoading(false);
      setIsError(data.error.message);
    } else {
      dispatch(authActions.login(data));
      navigate("/", { replace: true });
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
            >
              {isError && (
                <Alert status="error">
                  <AlertIcon /> {isError}
                </Alert>
              )}
              <Heading>Sign up</Heading>

              <FormLabel mt={5}>Email Address</FormLabel>

              <Input
                isRequired
                name="userEmail"
                value={formData.userEmail}
                placeholder="name@mail.com"
                focusBorderColor="lime"
                onChange={inputHandler}
                variant="filled"
                type="email"
              />

              <FormLabel mt={5}>Password </FormLabel>
              <Input
                placeholder="8+ Characters, 1 Capital Letter"
                focusBorderColor="lime"
                variant="filled"
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={inputHandler}
              />

              <FormLabel mt={5}>Confirm your Password </FormLabel>
              <Input
                placeholder="8+ Characters, 1 Capital Letter"
                focusBorderColor="lime"
                variant="filled"
                type="password"
                name="confirmPassword"
                onChange={inputHandler}
                value={formData.confirmPassword}
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
                Sign up
              </Button>

              <Link
                to="/auth/signin"
                as={NavLink}
                color="#4f85e2"
                mt="2"
                display="block"
              >
                Have an account? Sign in
              </Link>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
