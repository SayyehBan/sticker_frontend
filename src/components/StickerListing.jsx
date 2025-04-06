import StickerCart from "./StickerCart";
const StickerListing = ({ currentStickers, isLoading, isSuccess, isError }) => {
  return (
    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {isSuccess ? (
        <>
          {currentStickers?.map((sticker, index) => (
            <StickerCart key={index} stickers={sticker} />
          ))}
        </>
      ) : isLoading ? (
        <p>در حال بارگذاری</p>
      ) : (
        <p>مشکلی پیش آمده...</p>
      )}
    </div>
  );
};
export default StickerListing;
