import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    favoriteItems: [],
    status: 'loading',
    error: null
}

export const addToFavorite = createAsyncThunk(
    'favorite/addToFavorite',
    async (sneaker, thunkAPI) => {
        try {
            const findItem = thunkAPI.getState().favorite.favoriteItems.find(item => item.parentId === sneaker.id)
            if (findItem) {
                await axios.delete(`https://ac15aa85171c1f7c.mokky.dev/favorites/${findItem.id}`);
                return {sneakerId: sneaker.id, action: 'remove'}
            } else {
                const {data} = await axios.post(`https://ac15aa85171c1f7c.mokky.dev/favorites`, sneaker);
                return {sneaker: data, action: 'add'}
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


// const favoriteSlice = createSlice({
//     name: 'favorite',
//     initialState,
//     reducers: {
//         setFavorites: (state, action) => {
//             state.favoriteItems = action.payload
//         }
//     },
//     extraReducers: builder => {
//         builder.addCase(addToFavorite.fulfilled, (state, action) => {
//             const {sneakerId, action: addAction} = action.payload
//             if (addAction === 'remove'){
//                 state.favoriteItems =  state.favoriteItems.filter(item => item.id !== sneakerId)
//             } else if (addAction === 'add'){
//                 state.favoriteItems.push(action.payload.sneaker)
//             }
//         })
//             .addMatcher(
//                 action => action.type.endsWith('/rejected'),
//                 (state, action) => {
//                     state.status = 'failed';
//                     state.error = action.error.message;
//                 }
//             )
//     }
// })

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favoriteItems = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToFavorite.fulfilled, (state, action) => {
                const { sneakerId, action: addAction, sneaker } = action.payload; // Добавляем sneaker, чтобы использовать его при добавлении
                if (addAction === 'remove') {
                    state.favoriteItems = state.favoriteItems.filter(item => item.parentId !== sneakerId); // Используем sneakerId для удаления элемента
                } else if (addAction === 'add') {
                    state.favoriteItems.push(sneaker); // Добавляем sneaker в favoriteItems
                }
            })
            .addMatcher(
                action => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                }
            );
    }
});


export default favoriteSlice.reducer;

export const {setFavorites} = favoriteSlice.actions;

export const selectFavoriteItems = state => state.favorite.favoriteItems;
export const selectIsItemFavorite = (state, itemId) =>
    state.favorite.favoriteItems.some(item => item.parentId === itemId);


