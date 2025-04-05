import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.stickerID === action.payload.stickerID
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("تعداد افزایش یافت", { position: "bottom-right" });
      } else {
        let tempStickerItem = {
          ...action.payload,
          cartQuantity: action.payload.cartQuantity,
        };
        state.cartItems.push(tempStickerItem);
        toast.success("محصول به سبد خرید اضافه شد", {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed());
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.stickerID === action.payload.stickerID
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("تعداد کاهش یافت", { position: "bottom-right" });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.stickerID !== action.payload.stickerID
        );
        state.cartItems = nextCartItems;
        toast.error("محصول از سبد خرید حذف شد", {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.stickerID === action.payload.stickerID) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.stickerID !== cartItem.stickerID
          );
          state.cartItems = nextCartItems;
          toast.error("محصول از سبد خرید حذف شد", {
            position: "bottom-right",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    }
  },
});
export const { addToCart, decreaseCart, removeFromCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
