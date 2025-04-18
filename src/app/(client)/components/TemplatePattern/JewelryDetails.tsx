import { JewelryProduct } from "@/app/models/Product";

export const JewelryDetails = ({ product }: { product: JewelryProduct }) => (
    <div className="flex gap-2 mb-2">
      <p className="font-bold">Metal Type:</p>
      <p className="text-gray-500">{product.metalType}</p>
    </div>
);