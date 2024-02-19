import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AuthModalProvider } from "./context/AuthModalProvider";
import { UsersProvider } from "./context/UserProvider";
import { queryClient } from "./utils/query";
import { createTheme } from "./utils/theme";

function App() {
  const proTheme = createTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={proTheme}>
        <AuthModalProvider>
          <UsersProvider>
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
          </UsersProvider>
        </AuthModalProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
