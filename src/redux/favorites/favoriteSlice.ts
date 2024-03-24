import {createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {FavoriteItem, FavoriteSliceState} from "./types";
import {RootState} from "../store";

const initialState: FavoriteSliceState = {
    favoriteItems: [],
    status: 'loading',
    error: null
}

export const addToFavorite = createAsyncThunk(
    'favorite/addToFavorite',
    async (sneaker:FavoriteItem, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            const findItem = state.favorite.favoriteItems.find((item: FavoriteItem) => item.parentId === sneaker.id)
            if (findItem) {
                await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/favorites/${findItem.id}`);
                return {sneakerId: sneaker.id, action: 'remove'}
            } else {
                const {data} = await axios.post(`https://ac15aa85171c1f7c.mokky.dev/favorites`, sneaker);
                return {sneaker: data, action: 'add'}
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)){
                return thunkAPI.rejectWithValue(error.response?.data)
            } else {
                throw error;
            }
        }
    }
)

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
            state.favoriteItems = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToFavorite.fulfilled, (state, action) => {
                const { sneakerId, action: addAction, sneaker } = action.payload;
                if (addAction === 'remove') {
                    state.favoriteItems = state.favoriteItems.filter(item => item.parentId !== sneakerId);
                } else if (addAction === 'add') {
                    state.favoriteItems.push(sneaker);
                }
            })
            .addMatcher(
                isRejectedWithValue,
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    }
});


export default favoriteSlice.reducer;

export const {setFavorites} = favoriteSlice.actions;




