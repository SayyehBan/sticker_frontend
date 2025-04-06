import StickerCart from "./StickerCart";
const StickerListing = ({ currentStickers, status }) => {
  return (
    <div className="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {status === "success" ? (
        <>
          {currentStickers?.map((sticker, index) => (
            <StickerCart key={index} stickers={sticker} />
          ))}
        </>
      ) : status === "pending" ? (
        <p>در حال بارگذاری</p>
      ) : (
        <p>مشکلی پیش آمده...</p>
      )}
    </div>
  );
};
export default StickerListing;
