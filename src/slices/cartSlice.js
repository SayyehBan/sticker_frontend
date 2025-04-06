import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartAdapter = createEntityAdapter({
  selectId: (sticker) => sticker.stickerID,
});

const initialState = cartAdapter.getInitialState({
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    populateCart(state, action) {
      if (localStorage.getItem("cartItems")) {
        cartAdapter.setAll(state, JSON.parse(localStorage.getItem("cartItems")))
      }
    },
    addToCart(state, action) {
      const stickerID = parseInt(action.payload.stickerID);
      const stickerExist = state.entities[stickerID];

      if (stickerExist) {
        stickerExist.cartQuantity = (stickerExist.cartQuantity || 0) + 1;
        toast.info("تعداد افزایش یافت", { position: "bottom-right" });
      } else {
        cartAdapter.addOne(state, { ...action.payload, cartQuantity: 1 });
        toast.success("محصول به سبد خرید اضافه شد", {
          position: "bottom-right",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.entities));
    },
    getTotals(state, action) {
      let { total, quantity } = Object.values(state.entities).reduce(
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
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    decreaseCart(state, action) {
      const stickerID = parseInt(action.payload.stickerID);
      const sticker = state.entities[stickerID];

      if (sticker.cartQuantity > 1) {
        sticker.cartQuantity -= 1;
        toast.info("تعداد کاهش یافت", { position: "bottom-right" });
      } else if (sticker.cartQuantity === 1) {
        const stickerID = parseInt(action.payload.stickerID);
        cartAdapter.removeOne(state, stickerID);
        toast.error("محصول از سبد خرید حذف شد", {
          position: "bottom-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.entities));
    },
    removeFromCart(state, action) {
      const stickerID = parseInt(action.payload.stickerID);
      cartAdapter.removeOne(state, stickerID);
      toast.error("محصول از سبد خرید حذف شد", {
        position: "bottom-right",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.entities));
    }
  },
});
export const {
  selectAll
} = cartAdapter.getSelectors(state => state.cart);
export const { populateCart, addToCart, decreaseCart, removeFromCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
