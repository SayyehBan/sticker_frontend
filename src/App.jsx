import { Helmet } from "react-helmet";
import MainLayout from "./components/layouts/MainLayout";
import { miladiToShamsiAndShahanshahi } from "./utilities/PersianDateConverter";
import Header from "./components/Header";
import StickerListing from "./components/stickerListing";

function App() {
  return (
    <MainLayout>
      <Helmet>
        <title>
          فروشگاه استیکر {miladiToShamsiAndShahanshahi(new Date(), 1)}
        </title>
      </Helmet>
      <div className="max-auto ">
        <Header />
        <StickerListing />
      </div>
    </MainLayout>
  );
}

export default App;
