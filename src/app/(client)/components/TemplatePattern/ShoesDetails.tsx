import { ShoesProduct } from "@/app/models/Product";

export const ShoesDetails = ({ product }: { product: ShoesProduct }) => (
    <div className="flex gap-2 mb-2">
      <p className="font-bold">Sole Type:</p>
      <p className="text-gray-500">{product.soleType}</p>
    </div>
);