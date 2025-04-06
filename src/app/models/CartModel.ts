import { CartItemModel } from "./CartItemModel";

export interface Cart {
    id: number;
    userId: number;
    cartItems: CartItemModel[];
}
