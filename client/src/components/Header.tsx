import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export const Header = () => {
  const [colorChange, setColorChange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 64) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <Flex
      zIndex={100}
      position='fixed'
      top='0'
      left='auto'
      right='0'
      px='24px'
      direction='row'
      align='center'
      justify='space-between'
      width='100%'
      h='64px'
      background={colorChange ? "rgb(19, 19, 19)" : "transparent"}
    >
      <Flex alignItems='center' justify='center' dir='row' gap={4}>
        <Heading
          as={ReactRouterLink}
          to='/home'
          fontFamily="'Meddon', cursive;"
          size='md'
          color='white'
          cursor='pointer'
        >
          Thirai
        </Heading>
        <Box
          py='6px'
          px='8px'
          ml='8px'
          fontSize='18px'
          fontWeight={700}
          color='white'
          as={ReactRouterLink}
          to='/movies'
          borderRadius='6px'
          _hover={{ bg: "#525CEB", color: "white" }}
        >
          Movies{" "}
        </Box>
        <Box
          py='6px'
          px='8px'
          fontSize='18px'
          fontWeight={700}
          color='white'
          as={ReactRouterLink}
          to='/series'
          borderRadius='6px'
          _hover={{ bg: "#525CEB", color: "white" }}
        >
          Tv series{" "}
        </Box>
        <Box
          py='6px'
          px='8px'
          fontSize='18px'
          fontWeight={700}
          color='white'
          as={ReactRouterLink}
          to='/search'
          borderRadius='6px'
          _hover={{ bg: "#525CEB", color: "white" }}
        >
          Search
        </Box>
      </Flex>
      <Box
        py='6px'
        px='8px'
        fontSize='18px'
        fontWeight={700}
        color='white'
        as={ReactRouterLink}
        to='/signin'
        borderRadius='6px'
        _hover={{ bg: "#525CEB", color: "white" }}
      >
        Sign in
      </Box>
    </Flex>
  );
};
