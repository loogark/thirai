import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { API } from "../../utils/query";

interface RegistrationData {
  email: string;
  password: string;
}

const useLogin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser, getUser } = useUser();
  const mutation = useMutation<any, undefined, RegistrationData>(
    async ({ email, password }) => {
      const response = await API.post("/authorization/login", {
        email,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        const user = getUser();
        if (!user) {
          setUser(data);
        }
        toast({
          title: "Login Success.",
          description: "You've Successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/home");
      },
    }
  );

  return mutation;
};

export default useLogin;
