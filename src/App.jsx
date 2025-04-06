import { Helmet } from "react-helmet";
import MainLayout from "./components/layouts/MainLayout";
import { miladiToShamsiAndShahanshahi } from "./utilities/PersianDateConverter";
import Header from "./components/Header";
import PaginateItems from "./components/common/PaginateItems";
import { useStickersGetAllQuery } from "./slices/stickerApi";
import { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1); // شماره صفحه فعلی
  const [pageSize] = useState(4); // اندازه صفحه (می‌توانید این را هم داینامیک کنید)

  const {
    data: stickersData = {},
    isLoading,
    isSuccess,
    isError,
  } = useStickersGetAllQuery({ pageNumber: currentPage, pageSize });
  // فرض می‌کنیم API اطلاعات صفحه‌بندی را به این شکل برمی‌گرداند
  const stickers = stickersData?.data || [];
  const totalRecords = stickersData?.totalRecords || 0;
  const totalPages = stickersData?.totalPages || 1;
  return (
    <MainLayout>
      <Helmet>
        <title>
          فروشگاه استیکر {miladiToShamsiAndShahanshahi(new Date(), 1)}
        </title>
      </Helmet>
      <div className="max-auto ">
        <Header />
        <PaginateItems
          stickers={stickers}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} // برای تغییر صفحه
        />
      </div>
    </MainLayout>
  );
};

export default App;
