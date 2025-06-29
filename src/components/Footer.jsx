import { Box, Image, Text, Flex } from "@chakra-ui/react";
import logo from "../assets/cohere.svg";

const Footer = () => {
  return (
    <Box marginTop={100}>
      <Flex
        flexDirection="column"
        gap={2}
        background="black"
        border="1px solid #fcfcfc"
        padding={3.5}
        borderRadius={6}
      >
        <Text lineHeight={0.8} fontSize="0.8rem">
          Powered by Cohere
        </Text>
        <Image src={logo} alt="logo" />
      </Flex>
    </Box>
  );
};

export default Footer;
