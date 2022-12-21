import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInboxMail } from "../mailApi";

const Inbox = () => {
  const [mails, setMails] = useState(null);

  const loggedInEmail = useSelector((state) => state.auth.loggedInEmail);
  const formattedEmail = loggedInEmail.replace("@", "").replace(".", "");

  useEffect(() => {
    const sendRequest = async () => {
      const { response, data } = await getInboxMail(formattedEmail);
      if (response.ok) {
        if (data) {
          let mailArr = [];

          for (let key in data) {
            const mailObj = data[key];
            mailObj.id = key;
            mailArr.push(mailObj);
          }

          setMails((prev) => {
            return [...mailArr];
          });
        } else console.log("no data found");
      }
    };

    sendRequest();
  }, []);

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
        {!mails && <Heading textAlign="center">Your inbox is empty</Heading>}

        {mails &&
          mails.map((mail) => (
            <SimpleGrid
              shadow="md"
              borderRadius="lg"
              p="2"
              border="1px"
              key={mail.id}
              mt="2"
              columns={2}
              spacing={2}
            >
              <Box>{mail.from}</Box>
              <Box overflow="hidden" textOverflow="ellipsis">
                {mail.body}
              </Box>
            </SimpleGrid>
          ))}
      </Box>
    </Flex>
  );
};

export default Inbox;
