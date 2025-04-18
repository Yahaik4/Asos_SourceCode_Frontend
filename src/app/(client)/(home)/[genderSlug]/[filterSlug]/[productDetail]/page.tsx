'use client'

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MdOutlineFileUpload } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiCoatHangerBold, PiTruckLight, PiCopySimpleLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import Breadcrumbs from "@/app/(client)/components/Breadcrumbs";

import { fetchFilteredProducts } from "@/Services/productService";
import { useFetch } from "@/Hook/useFetch";
import { Product, ClothingProduct, ShoesProduct, JewelryProduct } from "@/app/models/Product";
import imgProduct from '../../../../../../../public/Home/Women/Products/product1.avif'
// import imgProductHover from '../../../../../../public/Home/Women/Products/productHover1.avif'
import Image from "next/image"
import Color from "@/app/(client)/components/Color";
import DropdownOption from "@/app/(client)/components/DropdownOption";
import { AddCartItem } from "@/Services/cartService";
import {CartItemModel} from "@/app/models/CartItemModel";
import { useCart } from "@/app/(client)/Context/CartContext";
import { ProductDetailTemplate } from "@/app/(client)/components/TemplatePattern/ProductDetailTemplate";


const page: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const productId = pathname.split('/')[3];

    const [dataItem, setDataItem] = useState({
        color: '',
        size: '',
    });

    const handleAddItem = (data: Partial<{color: string, size:string}>) => {
        setDataItem((prev) => prev = {...prev, ...data});
    }
    
    const fetchFn = useCallback(() => {
        return fetchFilteredProducts([
            {key: "id", value: productId },
        ])
    }, [productId]);
    
    const { isFetching, fetchedData, error } = useFetch<Product[]>(fetchFn, []);
    const product = fetchedData[0];
    const [variantData, setVariantData] = useState({
        colors: new Set<string>(),
        sizes: new Set<string>()
    });
    console.log(product);

    useEffect(() => {
        const newColorSet = new Set<string>();
        const newSizeSet = new Set<string>();

        product?.variants?.forEach((item) => {
            if(item?.color?.rgb){
                newColorSet.add(item.color.rgb);
            }
            if(item?.size.size){
                newSizeSet.add(item.size.size);
            }
        })
        setVariantData({
            colors: newColorSet,
            sizes: newSizeSet
        });
    }, [product])

    const [variantId, setVariantId] = useState<number | null>(null);
    const { cartItems, setCartItems } = useCart();
    let initialValueCartItem: CartItemModel = {id: 0, 
        cartId: 0, 
        variantId: 0, 
        productName: "", 
        imageUrl: "", 
        color: "", 
        size: "", 
        quantity: 0, 
        price: 0 }

    const handlePOSTAddToCart = useCallback(async () => {
        if(variantId){
            const newCartItem = await AddCartItem(variantId, 1);
            setCartItems([...cartItems, newCartItem]);

            toast.success("Product added to cart successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
        return Promise.resolve(null)
    }, [variantId, setCartItems])

    const { isFetching: isFetchingCart, fetchedData: item, error: errorCartItem } = useFetch<CartItemModel | null>(
        handlePOSTAddToCart,
        initialValueCartItem
    );

    function handleAddToCart() {
        const selectedVariant = product.variants.find(
            (item) => item.color.rgb === dataItem.color && item.size.size === dataItem.size
        );
        if(selectedVariant){
            setVariantId(selectedVariant.id)
        }
    }
    useEffect(() => {
        console.log("errorCartItem:", errorCartItem);
        console.log("error:", error);
    
        const errorMessage = errorCartItem?.message || error?.message;
        
        if (errorCartItem || error) {
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
            });
    
            if (errorMessage === 'Please Login') {
                sessionStorage.setItem("loginError", errorMessage);
                router.push("/login");
            }
        }
    }, [error, errorCartItem, router]);

    
    if(isFetching) return <p>Loading...</p>


    return(
        <div className="mb-16">
            <ToastContainer />
            <Breadcrumbs pathname={pathname}/>
            <div className="flex mx-[260px] items-start justify-center mt-10">
                <div className="flex">
                    <div className="w-[40px]">
                        {
                            product?.productImages?.length > 0 && (
                                product.productImages.map((image) => {
                                    return (
                                        <Image width={40} height={52} className="pb-3" key={image.id} src={image.imageUrl} alt="" />
                                    )
                                })
                            )
                        }
                        {/* <Image className="pb-3" src={imgProduct} alt="" /> */}

                    </div>

                    <div className="relative w-[500px] h-[650px] mx-4">
                        {
                            product?.productImages?.length > 0 && (
                                <Image fill className="" src={product.productImages[0].imageUrl} alt="" />
                            )
                        }
                    </div>
                </div>
                <div className="px-3 py-2">
                    <div className="flex items-center justify-between">
                        <h1 className="mb-3 tracking-wide text-xl">{product?.name}</h1>
                        <MdOutlineFileUpload size={50}/>
                    </div>
                    <h1 className="mb-2 font-bold text-red-700 text-lg">Now £{product?.price}</h1>
                    <p className="text-sm text-gray-500 tracking-widest">Was £32.00(-25%)</p>
                    
                    <div className="flex my-5 bg-blue-200 px-4 py-3 items-center gap-3">
                        <IoPricetagsOutline size={20}/>
                        <p className="font-thin ">Get 30% off! With code: <span className="font-bold">DAWN</span></p>
                    </div>
                    <div className="flex gap-2 mb-2">
                        <p className="font-bold">Description: </p>
                        <p className="text-gray-500">{product?.description}</p> 
                    </div>
                    <div className="flex gap-2 mb-2">
                        <p className="font-bold">Gender: </p>
                        <p className="text-gray-500">{product?.gender}</p> 
                    </div>

                    {product && <ProductDetailTemplate product={product} />}

                    <div className="flex">
                        <p className="text-sm font-bold tracking-wide mr-4">COLOUR:</p>
                        <Color handleOption={handleAddItem} colors={Array.from(variantData.colors)}/>    
                    </div>

                    <div className="mt-3">
                        <div className="flex justify-between text-sm mb-2">
                            <p className="font-bold tracking-widest">SIZE:</p>
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-blue-500">
                                    <PiCoatHangerBold className="m-[2px]" size={15} color="white"></PiCoatHangerBold>
                                </div>
                                <p className="font-thin underline text-gray-700">Find your Fit Assistant size</p>
                            </div>
                        </div>
                        
                        <DropdownOption handleOption={handleAddItem} defaultValue="Please select" options={Array.from(variantData.sizes)}/>
                        
                    </div>

                    <div className="flex items-center justify-between mt-2 gap-4">
                        <button
                            type="button"
                            className={`px-24 py-3 font-bold text-white ${dataItem.color && dataItem.size ? "bg-green-700" : "bg-stone-300"}`}
                            onClick={handleAddToCart}
                            disabled={!dataItem.color || !dataItem.size}
                        >
                            ADD TO BAG
                        </button>
                        <div className="bg-stone-200 rounded-full p-4">
                            <FaRegHeart className="" size={20}/>
                        </div>

                    </div>

                    <div className="mt-7 border-[1px]">
                        <div className="flex gap-3 justify-start p-3 text-sm">
                            <PiTruckLight size={30}></PiTruckLight>
                            <div className="flex flex-col items-start gap-3 mb-4 pt-1">
                                <p>Free delivery on qualifying orders.</p>
                                <div className="flex items-center">
                                    <p className="underline">View our Delivery & Returns Policy</p>
                                    <PiCopySimpleLight />
                                </div>
                            </div>
                        </div>
                        <div className="px-3 text-[12px] text-gray-400 underline border-t-[1px] py-4">
                            This product has shipping restrictions.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page