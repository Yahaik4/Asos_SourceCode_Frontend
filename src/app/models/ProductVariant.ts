import { Color } from "./Color"
import { ProductSize } from "./ProductSize"

export interface ProductVariant {
    id: number,
    productId: number,
    colorId: number,
    color: Color,
    sizeId: number,
    size: ProductSize,
    stock: number
}