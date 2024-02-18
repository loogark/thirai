import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthModalProvider } from "./context/AuthModalProvider";
import { UsersProvider } from "./context/UserProvider";
import { queryClient } from "./utils/query";
import { createTheme } from "./utils/theme";

function App() {
  const proTheme = createTheme();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={proTheme}>
        <AuthModalProvider>
          <UsersProvider>
            <Header />
            <Outlet />
            <ScrollRestoration />
          </UsersProvider>
        </AuthModalProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
