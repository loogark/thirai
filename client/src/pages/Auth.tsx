import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import useLogin from "../hooks/api/useLogin";
import useRegister from "../hooks/api/useRegister";

interface Props {
  type: "signup" | "signin";
}

export const Auth = ({ type }: Props) => {
  const isSignUp = type === "signup";
  const [value, setValue] = useState({ name: "", email: "", password: "" });
  const register = useRegister();
  const login = useLogin();
  const { getUser } = useUser();
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (isSignUp) {
      await register.mutateAsync({
        email: value.email,
        firstName: value.name,
        password: value.password,
      });
    } else {
      await login.mutateAsync({
        email: value.email,
        password: value.password,
      });
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate("/home");
    }
  }, []);

  return (
    <Flex
      width='100%'
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
      justify='center'
      align='center'
    >
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Heading as={"h5"}>Thirai</Heading>
          {isSignUp ? (
            <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
              <Heading size={{ base: "xs", md: "sm" }}>
                Create your account
              </Heading>
              <Text color='fg.muted'>
                Already have an account?{" "}
                <ChakraLink as={ReactRouterLink} to='/signin'>
                  Sign in
                </ChakraLink>
              </Text>
            </Stack>
          ) : (
            <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
              <Heading size={{ base: "xs", md: "sm" }}>
                Log in to your account
              </Heading>
              <Text color='fg.muted'>
                Don't have an account?{" "}
                <ChakraLink as={ReactRouterLink} to='/signup'>
                  Sign up
                </ChakraLink>
              </Text>
            </Stack>
          )}
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing='6'>
            <Stack spacing='5'>
              {isSignUp && (
                <FormControl>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    value={value.name}
                    id='name'
                    type='name'
                    onChange={(e) =>
                      setValue((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </FormControl>
              )}
              <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  value={value.email}
                  id='email'
                  type='email'
                  onChange={(e) =>
                    setValue((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input
                  value={value.password}
                  id='password'
                  type='password'
                  onChange={(e) =>
                    setValue((p) => ({ ...p, password: e.target.value }))
                  }
                />
              </FormControl>
            </Stack>
            <Stack spacing='6'>
              <Button onClick={onSubmit}>
                {isSignUp ? "Sign up" : "Sign in"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
