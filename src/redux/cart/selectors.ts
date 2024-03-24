import {RootState} from "../store";
import {CartItem} from "./types";

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectIsItemAdded = (state: RootState, itemId: number) =>
    state.cart.cartItems.some((item: CartItem) => item.parentId === itemId);