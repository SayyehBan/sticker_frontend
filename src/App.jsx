import { Helmet } from "react-helmet";
import MainLayout from "./components/layouts/MainLayout";
import { miladiToShamsiAndShahanshahi } from "./utilities/PersianDateConverter";
import Header from "./components/Header";
import PaginateItems from "./components/common/PaginateItems";
import { useSelector } from "react-redux";

const App = () => {
  const { items: stickers, status } = useSelector((state) => state.stickers);
  return (
    <MainLayout>
      <Helmet>
        <title>
          فروشگاه استیکر {miladiToShamsiAndShahanshahi(new Date(), 1)}
        </title>
      </Helmet>
      <div className="max-auto ">
        <Header />
        <PaginateItems stickers={stickers} status={status} />
      </div>
    </MainLayout>
  );
};

export default App;
