import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";
import { Helmet } from "react-helmet";
import { Server_URL } from "../utilities/constants/contactValue";
import CustomNumeralNumericFormat from "./Price";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import QuantityInput from "./common/QuantityInput";

const CartTable = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (sticker) => {
    dispatch(addToCart(sticker));
  };
  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseCart(item));
  };
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen py-10">
      <Helmet>
        <title>سبد خرید | فروشگاه استیکر</title>
      </Helmet>
      {cart.cartItems.length === 0 ? (
        <div className="text-center mt-10 text-lg text-gray-700">
          <p>سبد خرید شما خالی است ☺️</p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            سبد خرید شما
          </h1>

          <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm sm:text-base">
                  <th className="py-3 px-4">محصول</th>
                  <th className="py-3 px-4">تعداد</th>
                  <th className="py-3 px-4 hidden sm:table-cell">قیمت</th>
                  <th className="py-3 px-4">حذف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {cart.cartItems.map((item) => (
                  <tr key={item.stickerID} className="text-gray-800">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={`${Server_URL}${item.sticker}`}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg hidden sm:block"
                      />
                      <Link
                        to={`/stickers/${item.stickerID}`}
                        className="hover:text-blue-500"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <QuantityInput
                        qty={item.cartQuantity}
                        decrementQty={() => handleDecreaseQuantity(item)}
                        incrementQty={() => handleAddToCart(item)}
                      />
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <CustomNumeralNumericFormat
                        value={item.price * item.cartQuantity}
                        thousandSeparator=","
                        perfix="قیمت : "
                        suffix=" تومان "
                      />
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {cart.cartTotalAmount > 0 && (
                  <tr className="font-semibold text-gray-800 text-lg">
                    <td></td>
                    <td className="py-4 px-6">قیمت کل :</td>
                    <td className="py-4 px-6 text-blue-600">
                      <CustomNumeralNumericFormat
                        value={cart.cartTotalAmount}
                        thousandSeparator=","
                        suffix=" تومان "
                      />
                    </td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="max-w-md mx-auto mt-6 space-y-4">
            <Link
              to=""
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
            >
              تایید نهایی
              <FaArrowRight className="inline ml-2" />
            </Link>

            <Link
              to="/"
              className="block w-full text-center border border-blue-600 text-blue-600 py-3 rounded-lg text-lg font-semibold hover:bg-blue-100"
            >
              <FaArrowLeft className="inline mr-2" />
              برگشت به صفحه محصولات
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartTable;
