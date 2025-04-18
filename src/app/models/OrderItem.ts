import { ProductVariant } from "./ProductVariant";

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    productVariant: ProductVariant
}
