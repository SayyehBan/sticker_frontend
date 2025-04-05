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

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 w-full">
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
