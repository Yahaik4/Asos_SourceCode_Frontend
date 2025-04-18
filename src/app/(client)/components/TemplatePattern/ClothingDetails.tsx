import { ClothingProduct } from "@/app/models/Product";

export const ClothingDetails = ({ product }: { product: ClothingProduct }) => (
    <div className="flex gap-2 mb-2">
      <p className="font-bold">Material:</p>
      <p className="text-gray-500">{product.material}</p>
    </div>
);