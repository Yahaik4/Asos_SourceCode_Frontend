import { WishlistItem } from "./WishlistItem";

export interface Wishlist {
    id: number;
    userId: number;
    wishlistItems: WishlistItem[];
}
