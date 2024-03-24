import {useDispatch, useSelector} from "react-redux";
import { setCartItems } from '../redux/cart/cartSlice';
import {selectCartItems} from "../redux/cart/selectors";
import {RootState} from "../redux/store";
import {CartItem} from "../redux/cart/types";

export const useCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const totalPrice = useSelector((state: RootState) => {
        return state.cart.cartItems.reduce((total, item) => total + item.price, 0);
    });

    const updateCartItems = (newCartItems: CartItem[]) => {
        dispatch(setCartItems(newCartItems));
    };

    return { cartItems, updateCartItems, totalPrice };
};