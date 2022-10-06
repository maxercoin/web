import { Text, Box } from "@chakra-ui/react";
import React from "react";
import colors from "../utils/colors";
import { useRouter } from "next/router";
function Footercomponent() {
  const { push: goto } = useRouter();
  const {
    deg1color,
    deg2color,
    deg3color,
    primaryTextColor,
    primarycolor,
    secondarycolor,
  } = colors;
  const footerBtnsstyles = {
    _hover: { cursor: "pointer" },
  };
  return (
    <footer
      style={{
        background: `linear-gradient(to top, ${primarycolor},${secondarycolor})`,
        width: "100vw",
        height: "200px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-around"
        flexDirection="column"
        alignItems="center"
        w="100%"
        h="100%"
      >
        <Box display="flex" gap="5" color="#fff">
          <Text
            onClick={(e) => {
              goto("/");
            }}
            {...footerBtnsstyles}
          >
            Home
          </Text>
          <Text
            onClick={(e) => {
              goto("/privacy");
            }}
            {...footerBtnsstyles}
          >
            Privacy and Policy
          </Text>
          <Text
            onClick={(e) => {
              goto("/#contactus");
            }}
            {...footerBtnsstyles}
          >
            Contact Us
          </Text>
          <Text
            onClick={(e) => {
              goto("/#about");
            }}
            {...footerBtnsstyles}
          >
            About Us
          </Text>
        </Box>
        <Text color="#fff"> Copy Right Maxer Coin @ 2022</Text>
      </Box>
    </footer>
  );
}

export default Footercomponent;
