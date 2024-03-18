import { configureStore } from '@reduxjs/toolkit'
import cart from './cartSlice'
import favorite from './favoriteSlice'

export default configureStore({
    reducer: {cart, favorite}
})