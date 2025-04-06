import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Server_API_URL } from "../utilities/constants/contactValue";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
    totalRecords: 0,
};
export const fetchStickers = createAsyncThunk(
    "stickers/fetchStickers",
    async ({ pageNumber = 1, pageSize = 2 }) => { // آرگومان‌ها رو به صورت آبجکت می‌گیریم
        try {
            const url = `${Server_API_URL}Sticker/StickersGetAll?PageNumber=${pageNumber}&PageSize=${pageSize}`;
            console.log(url);
            const response = await axios.get(url);
            const data = await response.data;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);
const stickersSlice = createSlice({
    name: "stickers",
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Use the builder callback
        builder
            .addCase(fetchStickers.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(fetchStickers.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "success";
                state.totalPages = action.payload[0]?.totalPages || 0;
                state.totalRecords = action.payload[0]?.totalRecords || 0;
            })
            .addCase(fetchStickers.rejected, (state, action) => {
                state.status = "rejected";
            });
    },
});
export const { setCurrentPage } = stickersSlice.actions;
export default stickersSlice.reducer;
