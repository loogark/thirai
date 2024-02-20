import { createStandaloneToast } from "@chakra-ui/react";

interface ToastProps {
  message: string;
  status: number;
}

export const StandAloneToast = ({ message, status }: ToastProps) => {
  const { toast } = createStandaloneToast();
  const id = status.toString();

  return toast({
    id,
    title: `Error ${status}`,
    description: message,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};
