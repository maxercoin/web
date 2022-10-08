import React from "react";
import { Text, useToast } from "@chakra-ui/react";
import axios from "axios";
function RetrieveVerificationLink() {
  const toast = useToast();
  const toastMessage = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3600,
      isClosable: true,
    });
  };
  const retrieveLink = async () => {
    try {
      // const email = JSON.parse(sessionStorage.getItem("userEmail")
      const sendReq = await axios.get(
        `/api/user/auth/getauthlink?email=${sessionStorage.getItem(
          "userEmail"
        )}`
      );
      if (sendReq.status === 200) {
        toastMessage(
          "Email Sent",
          "Your email verification link has been sent successfully",
          "success"
        );
      }
    } catch (e) {
      console.log(e);
      toastMessage(
        "An error occured",
        "An error occured while trying to send your link retrieve email",
        "error"
      );
    }
  };

  // const resendLink = async () => {
  //   try {
  //     const email = JSON.parse(sessionStorage.getItem("userData"))?.userdata
  //       ?.email;
  //     const verificationLink = await axios.get(
  //       `/api/user/auth/getauthlink?email=${email}`
  //     );
  //   } catch (e) {}
  // };
  return (
    <Text onClick={retrieveLink} cursor="pointer" fontSize="1.5em" color="#fff">
      <i>
        <u>Click here</u>
      </i>
    </Text>
  );
}

export default RetrieveVerificationLink;
