import { Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export const Footer = () => {
  return (
    <Flex
      p='24px'
      mt='52px'
      direction={{ base: "column", md: "row" }}
      align='center'
      justify={{ base: "center", md: "space-between" }}
      width='100%'
      h='fit-content'
      bgColor={"rgb(19, 19, 19) "}
    >
      <Stack
        direction={{ base: "column", lg: "column" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        align={{ base: "center", md: "flex-start" }}
      >
        <Flex direction={{ base: "column", md: "row" }} gap='8px'>
          <Text color='white' fontSize='sm'>
            Copyright © 2024 - All rights reserved.
          </Text>
          <Text color='white' fontSize='sm'>
            Data provided by{" "}
            <Link
              color='blue.400'
              href='https://developer.themoviedb.org/docs/getting-started'
              isExternal
            >
              TMDB API
            </Link>{" "}
          </Text>
        </Flex>
        <Text color='white' fontSize='sm'>
          Made with 💖 by{" "}
          <Link color='blue.400' href='https://github.com/loogark' isExternal>
            @loogark
          </Link>
        </Text>
      </Stack>
      <HStack gap='12px' align='center' justify='center'>
        <Link href='https://github.com/loogark' isExternal>
          <FaGithub color='white' size={24} />
        </Link>
        <Link href='https://www.linkedin.com/in/ragool-krishnan/' isExternal>
          <FaLinkedin color='white' size={24} />
        </Link>
        <Link href='mailto:ragoolkrishnan.ram@example.com' isExternal>
          <IoMdMail color='white' size={26} />
        </Link>
      </HStack>
    </Flex>
  );
};
