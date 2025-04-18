import { Product } from "./Product";

export interface WishlistItem {
    id: number;
    wishlistId: number;
    productId: number;
    product: Product;
}
