import React, { ReactNode, useContext } from "react";

interface UserContextType {
  getUser: () => Record<string, string>;
  setUser: (user: Record<string, string>) => void;
  removeUser: () => void;
}

const UserContext = React.createContext<UserContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const UsersProvider = ({ children }: Props) => {
  const setUser = (user: Record<string, string>) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getUser = () => {
    const fromLocalStorage = localStorage.getItem("user");
    if (fromLocalStorage) {
      return JSON.parse(fromLocalStorage);
    }
    return null;
  };

  const removeUser = () => {
    localStorage.removeItem("user");
  };

  const value = {
    setUser,
    getUser,
    removeUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error(
      `Received null while calling useContext(InsightsContext), did you forget to put the provider ?`
    );
  }

  return context;
};
