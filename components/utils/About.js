import { Box, Text } from "@chakra-ui/react";
import React from "react";

function About() {
  return (
    <Box
      id="about"
      mt="5"
      display="grid"
      placeItems="center"
      width="95%"
      overflow="hidden"
    >
      <Box w="95%">
        <Text
          textShadow="1px 2px #000"
          fontSize="1.5em"
          color="#fff"
          textAlign="center"
          fontWeight="bold"
        >
          ABOUT US
        </Text>
        <Text fontSize="1em" color="#fff" textAlign="center">
          Maxercoin helps make saving and investing seamless. Maxercoin take
          away the stress and planning required to save and invest on a regular
          basis through its automated and easy-to-use platform. Your savings
          also generate interests until a set maturity date.
        </Text>
      </Box>
    </Box>
  );
}

export default About;
