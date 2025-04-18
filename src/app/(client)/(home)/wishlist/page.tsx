'use client'

import { BsBag } from "react-icons/bs";
import Button from "../../components/Button";
import { useState, useEffect } from "react";

import ProductList from "../../components/ProductList";
import { useFetch } from "@/Hook/useFetch";
import { fetchAllWishListItem } from "@/Services/wishlistService";
import { WishlistItem } from "@/app/models/WishlistItem";
import { Product } from "@/app/models/Product";

export default function(){
        
    const [wishListItem, setwishListItem] = useState<WishlistItem[]>([]);
    const [productItem, setproductItem] = useState<Product[]>([]);

    const { isFetching, fetchedData , error } = useFetch<WishlistItem[]>(fetchAllWishListItem , []);
    useEffect(() => {
        if (fetchedData) {
            setwishListItem(fetchedData);

            const wishlistProducts = fetchedData.map(item => item.product);
            setproductItem(prevItem => [...wishlistProducts, ...prevItem]);
        }
    }, [fetchedData]);
    console.log(fetchedData);

    if(isFetching) return <p>Loading...</p>
    
    return (
        error ? (
            <div className='flex justify-center gap-4 pt-4 pb-16 mt-20'>
                <div className="flex flex-col items-center gap-3"> 
                    <BsBag size={30}/> 
                    <p className="text-xl font-bold">You are not logged in</p>
                    <p>Please sign in to access your WishList.</p>
                    <Button title="SIGN IN" onClick={() => window.location.href = "/login"} />
                </div>
            </div>
        ) : wishListItem.length === 0 ? ( 
            <div className='flex justify-center gap-4 pt-4 pb-16 mt-20'>
                <div className="flex flex-col items-center gap-3"> 
                    <BsBag size={30}/> 
                    <p className="text-xl font-bold">Your bag is empty</p>
                    <p>Start shopping now to fill your wishlist!</p>
                    <Button title="SHOP NOW" onClick={() => window.location.href = "/women"}/>
                </div>
            </div>
        ) : (
                <div className="mt-8">
                    <ProductList products={productItem}/>
                </div>
            )
    );        
}