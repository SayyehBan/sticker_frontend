import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/NotFound";
import StickerDetails from "../components/StickerDetails";
import MainLayout from "../components/layouts/MainLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/stickers/:stickerID",
    element: (
      <MainLayout>
        <StickerDetails />
      </MainLayout>
    ),
  },
]);
