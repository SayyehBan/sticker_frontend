import { useEffect } from "react";
import StickerListing from "../stickerListing";
import ReactPaginate from "react-paginate";

const PaginateItems = ({
  stickers,
  isLoading,
  isSuccess,
  isError,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (event) => {
    document.documentElement.scrollTop = 0;
    const newPage = event.selected + 1; // react-paginate از 0 شروع می‌کند، API از 1
    setCurrentPage(newPage); // شماره صفحه جدید را تنظیم می‌کند
  };

  return (
    <>
      <StickerListing
        currentStickers={stickers}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
      {totalPages > 1 && (
        <ReactPaginate
          containerClassName="flex justify-center items-center mt-8 mb-4 gap-3 font-semibold"
          pageClassName="flex items-center justify-center w-12 h-12 bg-white border-2 border-indigo-300 rounded-lg shadow-sm hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
          activeClassName="bg-indigo-600 text-black border-indigo-600 hover:bg-indigo-700"
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages || 1}
          forcePage={currentPage - 1} // برای همگام‌سازی صفحه فعلی (از 0 شروع می‌شود)
          previousLabel={
            <span className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
              &lt;
            </span>
          }
          nextLabel={
            <span className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
              &gt;
            </span>
          }
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
};

export default PaginateItems;
