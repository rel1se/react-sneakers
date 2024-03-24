export type CartItem = {
    id: number;
    parentId: number;
    title: string;
    price: number;
    imageUrl: string
}

export interface CartSliceState {
    cartItems: CartItem[];
    status: string;
    error: unknown;
}