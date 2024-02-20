import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import useLogin from "../hooks/api/useLogin";
import useRegister from "../hooks/api/useRegister";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [value, setValue] = useState({ name: "", email: "", password: "" });
  const register = useRegister();
  const login = useLogin();
  const { getUser } = useUser();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    return () => {
      setValue({ name: "", email: "", password: "" });
    };
  }, [isSignUp]);

  function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const onSubmit = async () => {
    if (isSignUp) {
      if (value.name === "" || value.email === "" || value.password === "") {
        toast({
          title: "Error",
          description: "Please fill all the fields",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (!isValidEmail(value.email)) {
        toast({
          title: "Error",
          description: "Needs to be a valid email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (value.password.length < 4) {
        toast({
          title: "Error",
          description: "Password should be of minimum 4 characters.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (value.name.length < 3) {
        toast({
          title: "Error",
          description: "First name should be of at least 3 characters.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      await register.mutateAsync({
        email: value.email,
        firstName: value.name,
        password: value.password,
      });
    } else {
      if (value.email === "" || value.password === "") {
        toast({
          title: "Error",
          description: "Please fill all the fields",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (!isValidEmail(value.email)) {
        toast({
          title: "Error",
          description: "Needs to be a valid email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
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
    <Flex width='100%' pb='24px' justify='center' align='center'>
      <Stack spacing='8'>
        <Stack spacing='6'>
          {isSignUp ? (
            <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
              <Heading size={{ base: "xs", md: "sm" }}>
                Create your account
              </Heading>
              <Text color='fg.muted'>
                Already have an account?{" "}
                <Button variant='link' onClick={() => setIsSignUp(false)}>
                  Sign in
                </Button>
              </Text>
            </Stack>
          ) : (
            <Stack spacing={{ base: "2", md: "3" }} textAlign='center'>
              <Heading size={{ base: "xs", md: "sm" }}>
                Log in to your account
              </Heading>
              <Text color='fg.muted'>
                Don't have an account?{" "}
                <Button variant='link' onClick={() => setIsSignUp(true)}>
                  Sign up
                </Button>
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
              <Button bg={"#525CEB"} onClick={onSubmit}>
                {register.isLoading || login.isLoading ? (
                  <Spinner size='sm' color='#525CEB' />
                ) : isSignUp ? (
                  "Sign up"
                ) : (
                  "Sign in"
                )}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
