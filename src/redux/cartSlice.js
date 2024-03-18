import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


const initialState = {
    cartItems: [],
    status: 'loading',
    error: null
}
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (sneaker, thunkAPI) => {
        try {
            const findItem = thunkAPI.getState().cart.cartItems.find(item => item.parentId === sneaker.id);
            if (findItem) {
                await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/cart/${findItem.id}`);
                return {sneakerId: sneaker.id, action: 'remove'};
            } else {
                const {data} = await axios.post(`https://ac15aa85171c1f7c.mokky.dev/cart`, sneaker);
                return {sneaker: data, action: 'add'};
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/cart/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
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
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                }
            );
    }
})


export default cartSlice.reducer;
export const { setCartItems } = cartSlice.actions;
export const selectCartItems = state => state.cart.cartItems;
export const selectIsItemAdded = (state, itemId) =>
    state.cart.cartItems.some(item => item.parentId === itemId);