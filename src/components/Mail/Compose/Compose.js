import { Button, Flex, FormControl, Heading, Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { composeMail, inboxMail } from "../mailApi";

const Compose = () => {
  const emailRef = useRef();
  const subjectRef = useRef();

  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  let body = "";

  const submitHandler = async (event) => {
    event.preventDefault();

    if (emailRef.current.value === "") return;

    const mailObj = {
      from: loggedInEmail,
      to: emailRef.current.value,
      subject: subjectRef.current.value,
      body: body,
      markRead: false
    };

    const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");
    const formattedToEmail = emailRef.current.value
      .replace("@", "")
      .replace(".", "");

    const { response } = await composeMail(mailObj, formattedEmail);

    if (response.ok) {
      const { response } = await inboxMail(mailObj, formattedToEmail);

      if (response.ok) alert("Email sent successfully");
    }
  };

  const onEditorStateChange = (event) => {
    body = event.getCurrentContent().getPlainText();
  };

  const wrapperStyleObj = {
    display: "flex",
    flexDirection: "column-reverse",
    height: "20rem",
    overflow: "auto",
    backgroundColor: "white",
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgColor="#33206c"
      h="100vh"
      ml="200px"
      maxW="100vw"
      boxShadow="lg"
    >
      <form onSubmit={submitHandler}>
        <FormControl
          mt="9"
          boxShadow="outline"
          width={["100%", "4xl"]}
          maxW="100%"
          p={[0, "3rem"]}
          rounded="md"
          bgSize="contain"
          bgRepeat="no-repeat"
          bg="snow"
        >
          <Heading fontFamily="Lobster" color="green" textAlign="center">
            COMPOSE
          </Heading>

          <Input
            placeholder="To:"
            ref={emailRef}
            _placeholder={{ color: "green" }}
            type="email"
            name="userEmail"
            mb={4}
            variant="flushed"
          />
          <Input
            ref={subjectRef}
            placeholder="Subject: "
            _placeholder={{ color: "green" }}
            type="text"
            name="userPassword"
            variant="flushed"
            mb={4}
          />
          <Editor
            wrapperStyle={wrapperStyleObj}
            onEditorStateChange={onEditorStateChange}
          />
          <Button
            _hover={{ backgroundColor: "#767178" }}
            pl="10"
            pr="10"
            bgColor="#3b3a3b"
            mt={7}
            color="white"
            type="submit"
            w="100%"
          >
            Send
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

export default Compose;
