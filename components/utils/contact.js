import React from "react";
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import colors from "./colors";
import { useState } from "react";
import axios from "axios";
function Contact() {
  const [username, setusername] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const sendMessage = async () => {
    setIsLoading(true);
    if (!email || !message || !username) {
      toast({
        title: "All fields are required.",
        description: "Ensure all fields are field",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    try {
      // sendContactUs;
      const msg = await axios({
        url: "/api/contactus",
        method: "post",
        data: { email, username, message },
      });
      if (msg.status === 200) {
        toast({
          title: "Message sent.",
          description:
            "Your message has been sent, we shall respond as quick as posible",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast({
        title: "An error occured.",
        description:
          "Ensure all fields are field and check your internet connection",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      id="contactus"
      mb="5"
      display="flex"
      flexDirection="column"
      alignItems="center"
      w="100%"
      mt="5"
    >
      <Text
        color="#fff"
        fontWeight="bold"
        textAlign="center"
        textShadow="1px 2px #000"
        fontSize="1.5em"
      >
        CONTACT US
      </Text>
      <Text textAlign="center" color="#fff">
        Don't hesitate to contact us for any kind of information
      </Text>
      <Text textAlign="center" color="#fff">
        Your feedback helps us to improve our system and provide you with the
        best investment experience tailored to your needs.
      </Text>
      <Stack
        display="flex"
        padding={1}
        paddingBottom={3}
        flexDirection="column"
        alignItems="center"
        spacing={4}
        w="70%"
        mt="2"
        border="1px solid #fff"
        borderRadius="5px"
      >
        <Input
          type="text"
          w="100%"
          bg="#fff"
          onChange={(e) => setusername(e.target.value)}
          placeholder="Input your name: "
        />
        <Input
          type="email"
          w="100%"
          onChange={(e) => setEmail(e.target.value)}
          bg="#fff"
          placeholder="Input your email: "
        />
        <Textarea
          bg="#fff"
          placeholder="Your Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          onClick={sendMessage}
          isLoading={isLoading}
          _hover={{ bg: colors.secondarycolor, color: "#fff" }}
          w="40%"
        >
          SUBMIT
        </Button>
      </Stack>
    </Box>
  );
}

export default Contact;
