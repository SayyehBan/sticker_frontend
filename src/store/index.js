import { configureStore } from "@reduxjs/toolkit";
import stickerReducer, { fetchStickers } from "../slices/StickerSlice";
import cartReducer, { getTotals, populateCart } from "../slices/cartSlice";
import { stickerApi } from "../slices/stickerApi";
export const store = configureStore({
    reducer: {
        stickers: stickerReducer,
        cart: cartReducer,
        [stickerApi.reducerPath]: stickerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stickerApi.middleware),
});
store.dispatch(fetchStickers());
store.dispatch(populateCart());
store.dispatch(getTotals());