import { ClothingDetails } from "./ClothingDetails";
import { ShoesDetails } from "./ShoesDetails";
import { JewelryDetails } from "./JewelryDetails";

import { Product, ClothingProduct, ShoesProduct, JewelryProduct } from "@/app/models/Product";

export const ProductDetailTemplate = ({ product }: { product: Product }) => {
    if (product.productType === "Clothing") {
    return <ClothingDetails product={product as ClothingProduct} />;
    } else if (product.productType === "Shoes") {
    return <ShoesDetails product={product as ShoesProduct} />;
    } else if (product.productType === "Jewelry") {
    return <JewelryDetails product={product as JewelryProduct} />;
    }

    return null;
};
