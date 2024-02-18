import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { AccountMenu } from "./AccountMenu";
import { AuthModal } from "./AuthModal";

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
  const location = useLocation();
  const { getUser } = useUser();
  const user = getUser();

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
          bg={location.pathname.includes("/movie") ? "#525CEB" : "transparent"}
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
          to='/shows'
          bg={location.pathname.includes("/show") ? "#525CEB" : "transparent"}
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
          bg={location.pathname.includes("/search") ? "#525CEB" : "transparent"}
          borderRadius='6px'
          _hover={{ bg: "#525CEB", color: "white" }}
        >
          Search
        </Box>
      </Flex>
      {user ? <AccountMenu /> : <AuthModal />}
    </Flex>
  );
};
