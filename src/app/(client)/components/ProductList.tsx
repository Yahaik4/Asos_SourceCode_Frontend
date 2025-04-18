"use client";

import { Product } from '@/app/models/Product'
import ProductItem from './ProductItem'
import { useRouter, usePathname } from 'next/navigation'


interface ProductListProps{
    products: Product[],
}

const ProductList: React.FC<ProductListProps> = ({products}) => {
    const router = useRouter();
    const pathname = usePathname();

    function handleOnclickItem(id: number){
        router.push(`${pathname}/${id}`);
    }

    return (
        <div className="grid grid-cols-4 px-16 gap-2">
            {products.map((product) => {
                return  (
                    <ProductItem
                        onClick={() => handleOnclickItem(product.id)}
                        key={product.id}
                        name={product.name}
                        brand={product.brand.name}
                        description={product.description} 
                        price={product.price} 
                        img={product.productImages[0]?.imageUrl} 
                        imgHover={product.productImages[1]?.imageUrl}
                    />
                )
            })}
        </div>
    )
}

export default ProductList;