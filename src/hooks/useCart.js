import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { selectCartItems, setCartItems } from '../redux/cartSlice';

export const useCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const totalPrice = useSelector(state => {
        return state.cart.cartItems.reduce((total, item) => total + item.price, 0);
    });

    const updateCartItems = newCartItems => {
        dispatch(setCartItems(newCartItems));
    };

    return { cartItems, updateCartItems, totalPrice };
};