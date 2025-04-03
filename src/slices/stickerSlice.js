import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Server_API_URL } from "../utilities/constants/contactValue";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
};

export const fetchStickers = createAsyncThunk(
    "stickers/fetchStickers",
    async () => {
        try {
            const response = await axios.get(`${Server_API_URL}Sticker/StickersGetAll`);
            const data = await response.data;
            return data;
        } catch (error) {
            console.error(error); // Use console.error for errors
            throw error; // Re-throw the error to be handled by the rejected state
        }
    }
);

const stickersSlice = createSlice({
    name: "stickers",
    initialState,
    reducers: {},
    extraReducers: (builder) => { // Use the builder callback
        builder
            .addCase(fetchStickers.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(fetchStickers.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "success";
            })
            .addCase(fetchStickers.rejected, (state, action) => {
                state.status = "rejected";
            });
    },
});

export default stickersSlice.reducer;
