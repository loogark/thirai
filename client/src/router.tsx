import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Movie } from "./pages/Movie";
import { Movies } from "./pages/Movies";

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
      ],
    },
  ]);
}
