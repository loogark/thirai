import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { API } from "../../utils/query";

interface RegistrationData {
  email: string;
  firstName: string;
  password: string;
}

const useRegister = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const mutation = useMutation<any, undefined, RegistrationData>(
    async ({ email, firstName, password }) => {
      const response = await API.post("/authorization/register", {
        firstName,
        email,
        password,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setUser(data);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/home");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return mutation;
};

export default useRegister;
