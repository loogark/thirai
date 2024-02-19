import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useAuthModal } from "../context/AuthModalProvider";
import { Auth } from "../pages/Auth";

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen } = useAuthModal();
  return (
    <>
      <Button
        py='6px'
        px='8px'
        fontSize='18px'
        fontWeight={700}
        color='white'
        borderRadius='6px'
        bg='transparent'
        _hover={{ bg: "#525CEB", color: "white" }}
        onClick={() => setAuthModalOpen(true)}
      >
        Sign In
      </Button>

      <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='#525CEB'>Welcome to Thirai !</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Auth />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
