import { useEffect, useState } from "react";
import StickerListing from "../stickerListing";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchStickers, setCurrentPage } from "../../slices/StickerSlice";
const PaginateItems = () => {
  const dispatch = useDispatch();
  const {
    items: stickers,
    currentPage,
    totalPages,
    pageSize,
    status,
  } = useSelector((state) => state.stickers);

  useEffect(() => {
    // وقتی صفحه عوض می‌شه یا کامپوننت لود می‌شه، دیتا رو بگیر
    dispatch(fetchStickers({ pageNumber: currentPage, pageSize }));
  }, [currentPage, dispatch]);

  const handlePageClick = (event) => {
    const newPage = event.selected + 1; // react-paginate از 0 شروع می‌کنه، API از 1
    dispatch(setCurrentPage(newPage));
  };

  return (
    <>
      <StickerListing currentStickers={stickers} status={status} />
      <ReactPaginate
        containerClassName="flex justify-center items-center mt-8 mb-4 gap-3 font-semibold"
        pageClassName="flex items-center justify-center w-12 h-12 bg-white border-2 border-indigo-300 rounded-lg shadow-sm hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
        activeClassName="bg-indigo-600 text-black border-indigo-600 hover:bg-indigo-700"
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages || 1}
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
      />{" "}
    </>
  );
};

export default PaginateItems;
