import { Cart } from "./CartModel";
import { Wishlist } from "./Wishlist";
import { Address } from "./Address";
import { Order } from "./Order";

export interface User {
    id: number;
    name?: string;
    email: string;
    avatar?: string;
    password?: string;
    role: string;

    addresses: Address[];
    orders: Order[];
    carts: Cart | null;
    wishlists: Wishlist | null;
}