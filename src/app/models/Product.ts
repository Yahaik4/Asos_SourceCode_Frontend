import { ProductImage } from "./ProductImage";
import { ProductVariant } from "./ProductVariant";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  gender: string;
  currency: string;
  stock: number;
  categoryId: number;
  brandId: number;
  // orderItems: OrderItem[];
  // wishlists: Wishlist[];
  // productPromotions: ProductPromotion[];
  variants: ProductVariant[];
  productImages: ProductImage[];
  // tags: ProductTag[];
}