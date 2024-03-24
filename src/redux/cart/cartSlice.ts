import {AsyncThunk, createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {CartItem, CartSliceState} from "./types";
import {AppDispatch, RootState} from "../store";

const initialState: CartSliceState = {
    cartItems: [],
    status: 'loading',
    error: null
}



export const addToCart = createAsyncThunk
(
    'cart/addToCart',
    async (sneaker: CartItem, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            const findItem = state.cart.cartItems.find((item: CartItem) => item.parentId === sneaker.id);
            if (findItem) {
                await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/cart/${findItem.id}`);
                return {sneakerId: sneaker.id, action: 'remove'};
            } else {
                const {data} = await axios.post(`https://ac15aa85171c1f7c.mokky.dev/cart`, sneaker);
                return {sneaker: data, action: 'add'};
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

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id: number, thunkAPI) => {
        try {
            await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/cart/${id}`);
            return id;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)){
                return thunkAPI.rejectWithValue(error.response?.data)
            } else {
                throw error;
            }
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            const {sneakerId, action: addAction} = action.payload
            if (addAction === 'remove') {
                state.cartItems = state.cartItems.filter(item => item.parentId !== sneakerId);
            } else if (addAction === 'add') {
                state.cartItems.push(action.payload.sneaker);
            }
        })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            })
            .addMatcher(
                isRejectedWithValue,
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    }
})


export default cartSlice.reducer;
export const { setCartItems } = cartSlice.actions;
