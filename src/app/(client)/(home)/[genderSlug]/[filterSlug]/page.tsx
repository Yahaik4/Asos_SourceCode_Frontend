'use client'
import { useCallback, useState, useEffect } from "react";

import { usePathname } from "next/navigation"
import DropDownText from "@/components/DropDownText";
import DropDownList from "@/app/(client)/components/DropDownList";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ProductList from "@/app/(client)/components/ProductList";

import { useFetch } from '@/Hook/useFetch'
import { getAllProduct, fetchFilteredProducts } from '@/Services/productService'
import { Product } from '@/app/models/Product'
import { Felipa } from "next/font/google";

const page: React.FC = () => {
    const pathname = usePathname();
    const path = pathname.split('/');
    const gender = path[1];
    let filter = path[2];
    const [valueFilter, setValueFilter] = useState<{ key: string; value: string } | null>(null);
    const keywords = ["Clothing", "Shoes", "Jewelry"];

    useEffect(() => {
        if (filter === 'All') {
            setValueFilter(null);
        } else {
            if (keywords.some(keyword => filter.includes(keyword))) {
                setValueFilter({ key: "productType", value: filter });
            } else {
                setValueFilter({ key: "categoryName", value: filter });
            }
        }
    }, [filter]);
    console.log(valueFilter);
    
    
    const fetchFn = useCallback(() => {
        if (filter === 'All') {
            return fetchFilteredProducts([{ key: "gender", value: gender }]);
        }
        if (!valueFilter?.key || !valueFilter?.value) {
            return Promise.resolve([]);
        }
        return fetchFilteredProducts([
            { key: "gender", value: gender },
            valueFilter
        ]);
    }, [gender,filter, valueFilter]);
    
    const { isFetching, fetchedData, error } = useFetch<Product[]>(fetchFn , []);
    console.log(fetchedData); 

    
    if(isFetching) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>


    return(
        <div className="mb-16">
            <Breadcrumbs pathname={pathname}/>
            <div className="mt-5 flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold tracking-widest">Men's adidas</h1>
                <DropDownText>
                adidas needs no introduction. With a history stretching back over 60 years, the brand’s sports and streetwear designs have become key players in wardrobes everywhere. For that fresh-kit motivation, filter by adidas Performance for everything from techy tracksuits to sweat-wicking shorts, vests and compression tights. Inspired by street culture and retro styles, adidas Originals brings those fresh, archive-inspired T-shirts and sweatshirts we all know and love, alongside iconic Superstar, Stan Smith, Gazelle and Continental 80 trainers. Scroll the adidas at ASOS edit to check out our favourites – if you’re not already
                </DropDownText>
            </div>
            <div className="w-full mb-10 px-8 py-2 grid grid-cols-6 gap-2 bg-stone-100 ">
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Category" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Product Type" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Brand" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Price" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
                <div className="">
                    <DropDownList title="Sort" items={["Footwear", "Tops"]}/>
                </div>
            </div>
            <ProductList products={fetchedData}/>

            <div className="w-full flex flex-col items-center mt-3">
                <p className="text-[#666] text-sm font-normal">You've viewed 72 of 268 products</p>
                <progress className="my-2 h-[3px] appearance-none w-[200px]"></progress>
                <button className="tracking-widest font-bold py-3 px-28 border-2 border-gray-300 mt-2">LOAD MORE</button>
            </div>
        </div>
    )
}

export default page