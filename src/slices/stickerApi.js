import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Server_API_URL } from "../utilities/constants/contactValue";

export const stickerApi = createApi({
    reducerPath: "stickerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Server_API_URL,
        tagTypes: ["Sticker"],
    }),
    endpoints: (builder) => ({
        stickersDelete: builder.mutation({
            query: ({ stickerID, oldPhoto }) => ({
                url: `Sticker/StickersDelete?StickerID=${parseInt(
                    stickerID
                )}&OldPhoto=${oldPhoto}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Sticker", stickerID: arg.stickerID },
                "Sticker",
            ],
        }),
        stickersFindByID: builder.query({
            query: (stickerID) =>
                `Sticker/StickersFindByID?StickerID=${parseInt(stickerID)}`,
            providesTags: (result, error, arg) => [
                { type: "Sticker", stickerID: arg.stickerID },
                "Sticker",
            ],
        }),
        stickersGetAll: builder.query({
            query: () => `Sticker/StickersGetAll?PageNumber=${1}&PageSize=${2}`,
            providesTags: (result, error, arg) => [
                ...result.map(({ stickerID }) => ({ type: "Sticker", stickerID })),
                "Sticker",
            ],
        }), stickersInsert: builder.mutation({
            query: (sticker) => {
                const formData = new FormData();
                formData.append("Title", sticker.title);
                formData.append("Price", sticker.price);
                formData.append("Description", sticker.description);
                formData.append("File", sticker.sticker);
                return {
                    url: "Sticker/StickersInsert",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Sticker"],
        }),
        stickersUpdate: builder.mutation({
            query: (sticker) => {
                const formData = new FormData();
                formData.append("StickerID", parseInt(sticker.stickerID));
                formData.append("Title", sticker.title);
                formData.append("Price", sticker.price);
                formData.append("Description", sticker.description);
                formData.append("File", sticker.sticker);
                return {
                    url: "Sticker/StickersUpdate",
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: (result, error, arg) => [
                { type: "Sticker", stickerID: arg.stickerID },
                "Sticker",
            ]
        }),
    }),
});

export const {
    useStickersDeleteMutation,
    useStickersFindByIDQuery,
    useStickersGetAllQuery,
    useStickersInsertMutation,
    useStickersUpdateMutation,
} = stickerApi;
export const selectStickerResult =
    stickerApi.endpoints.stickersGetAll.select();
