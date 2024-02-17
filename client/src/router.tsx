import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Account } from "./pages/Account";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Movie } from "./pages/Movie";
import { Movies } from "./pages/Movies";
import { Person } from "./pages/Person";
import { Search } from "./pages/Search";
import { Show } from "./pages/Show";
import { Shows } from "./pages/Shows";

export namespace Router {
  export const _router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "signup",
          element: <Auth type='signup' />,
        },
        {
          path: "signin",
          element: <Auth type='signin' />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "movies",
          element: <Movies />,
        },
        {
          path: "/movie/:id",
          element: <Movie />,
        },
        {
          path: "/shows",
          element: <Shows />,
        },
        {
          path: "/show/:id",
          element: <Show />,
        },
        {
          path: "/person/:id",
          element: <Person />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/account",
          element: <Account />,
        },
      ],
    },
  ]);
}
