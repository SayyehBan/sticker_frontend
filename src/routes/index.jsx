import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import App from "../App";
import NotFound from "../components/NotFound";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/stickers/:stickerID",
        element: <App />,
      },
    ],
  },
]);
