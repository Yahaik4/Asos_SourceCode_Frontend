import { Brand } from "./Brand";
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
  brand: Brand;
  // orderItems: OrderItem[];
  // wishlists: Wishlist[];
  // productPromotions: ProductPromotion[];
  variants: ProductVariant[];
  productImages: ProductImage[];
  productType: string;
  // tags: ProductTag[];
}


export interface ClothingProduct extends Product {
  material: string;
}

export interface ShoesProduct extends Product {
  soleType: string;
}

export interface JewelryProduct extends Product {
  metalType: string;
}