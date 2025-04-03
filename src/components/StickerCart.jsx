import { Link } from "react-router-dom";
import { Server_URL } from "../utilities/constants/contactValue";
import CustomNumeralNumericFormat from "./Price";

const StickerCart = (stickers) => {
  const { stickerID, title, price, description, sticker } = stickers.stickers;

  return (
    <Link to={`/stickers/${stickerID}`} className="block hover:no-underline">
      <div className="bg-white h-120 w-72 rounded-lg shadow-xl mx-auto border border-gray-200 transition-transform duration-300 hover:shadow-2xl hover:scale-105">
        <div className="h-72 border-b-2 border-gray-100 relative overflow-hidden">
          <img
            src={`${Server_URL}${sticker}`}
            className="w-full h-full object-cover transform duration-500 ease-in-out hover:scale-110"
            alt={title}
          />
        </div>
        <div className="h-48 relative p-4">
          <div className="text-xl font-bold text-gray-800 mb-2">{title}</div>
          <div className="text-sm text-gray-600 line-clamp-3 mb-4">
            {description}
          </div>
          <div className="absolute bottom-0 right-0 mb-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-tl-2xl shadow-md">
            <CustomNumeralNumericFormat
              value={price}
              thousandSeparator=","
              prefix={`قیمت : `}
              suffix={` تومان `}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default StickerCart;
