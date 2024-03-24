import { configureStore } from '@reduxjs/toolkit'
import cart from './cart/cartSlice'
import favorite from './favorites/favoriteSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {cart, favorite}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch