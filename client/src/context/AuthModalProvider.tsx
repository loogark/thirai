import React, { ReactNode, useContext } from "react";

interface AuthModalContextType {
  authModalOpen: boolean;
  setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = React.createContext<AuthModalContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthModalProvider = ({ children }: Props) => {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  const value = {
    authModalOpen,
    setAuthModalOpen,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error(
      `Received null while calling useContext(InsightsContext), did you forget to put the provider ?`
    );
  }

  return context;
};
