import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";

const StickerForm = ({ sticker }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const atcBtnStyle = `py-3 bg-indigo-600 text-white w-full mt-2 rounded-lg font-medium text-lg 
                      flex justify-center items-center gap-2 hover:bg-indigo-700 transition-colors duration-200 shadow-md`;

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };

  const handleQuantityChange = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-sm font-medium">تعداد</label>
          <input
            type="number"
            inputMode="numeric"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="text-gray-900 px-3 py-2 border border-gray-300 w-20 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
          />
        </div>
        <p className="text-emerald-600 font-medium">در انبار موجود است</p>
      </div>
      <button
        className={atcBtnStyle}
        aria-label="cart-button"
        onClick={() => handleAddToCart({ ...sticker, cartQuantity: quantity })}
      >
        اضافه به سبد خرید
        <FaCartArrowDown aria-hidden="true" />
      </button>
    </div>
  );
};

export default StickerForm;
