'use client'

import { useCallback } from "react";
import { usePathname } from "next/navigation"
import { MdOutlineFileUpload } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiCoatHangerBold, PiTruckLight, PiCopySimpleLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import Breadcrumbs from "@/app/(client)/components/Breadcrumbs";

import { fetchFilteredProducts } from "@/Services/productService";
import { useFetch } from "@/Hook/useFetch";
import { Product } from "@/app/models/Product";
import imgProduct from '../../../../../../../public/Home/Women/Products/product1.avif'
// import imgProductHover from '../../../../../../public/Home/Women/Products/productHover1.avif'
import Image from "next/image"


const page: React.FC = () => {
    const pathname = usePathname();
    const productId = pathname.split('/')[3];
    console.log(productId);
    
    const fetchFn = useCallback(() => {
        return fetchFilteredProducts([
            {key: "id", value: productId }, 
        ])
    }, [productId]);
    
    const { isFetching, fetchedData, error } = useFetch<Product[]>(fetchFn, []);

    const product = fetchedData[0];
    console.log(product);
    
    if(isFetching) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>

    return(
        <div className="mb-16">
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
                        <Image className="pb-3" src={imgProduct} alt="" />
                        <Image className="pb-3" src={imgProduct} alt="" />
                        <Image className="pb-3" src={imgProduct} alt="" />
                        <Image className="pb-3" src={imgProduct} alt="" />

                    </div>

                    <div className="relative w-[500px] h-[650px] mx-10">
                        {
                            product?.productImages?.length > 0 && (
                                <Image fill className="" src={product.productImages[0].imageUrl} alt="" />
                            )
                        }
                    </div>
                </div>
                <div className="px-3 py-3 mt-6">
                    <div className="flex items-start">
                        <h1 className="mb-3 tracking-wide">{product?.name}ASOS DESIGN crop relaxed revere cord shirt with chest embroidery in brown</h1>
                        <MdOutlineFileUpload size={50}/>
                    </div>
                    <h1 className="mb-2 font-bold text-red-700 text-lg">Now £{product?.price}</h1>
                    <p className="text-sm text-gray-500 tracking-widest">Was £32.00(-25%)</p>
                    
                    <div className="flex my-5 bg-blue-200 px-4 py-3 items-center gap-3">
                        <IoPricetagsOutline size={20}/>
                        <p className="font-thin ">Get 30% off! With code: <span className="font-bold">DAWN</span></p>
                    </div>


                    <div className="flex">
                        <p className="text-sm font-bold tracking-wide mr-4">COLOUR:</p>
                        <div className="flex gap-2">
                            <div className="border-2 rounded-full inline-block">
                                <div className="border bg-red-500 p-2 rounded-full border-spacing-3">
                                </div>
                            </div>
                            <div className="border-2 rounded-full inline-block">
                                <div className="border bg-red-500 p-2 rounded-full border-spacing-3">
                                </div>
                            </div>
                        </div>
                        {/* <input className="" type="radio" />
                        <input className="" type="radio" />
                        <input className="" type="radio" />
                        <input className="" type="radio" />
                        <input className="" type="radio" /> */}
                    </div>

                    <div className="mt-3">
                        <div className="flex justify-between text-sm">
                            <p className="font-bold tracking-widest">SIZE:</p>
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-blue-500">
                                    <PiCoatHangerBold className="m-[2px]" size={15} color="white"></PiCoatHangerBold>
                                </div>
                                <p className="font-thin underline text-gray-700">Find your Fit Assistant size</p>
                            </div>
                        </div>
                        <div>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-green-700 px-24 py-3 font-bold text-white">ADD  TO BAG</button>
                        <div className="bg-stone-200 rounded-full p-4">
                            <FaRegHeart className="" size={20}/>
                        </div>
                    </div>

                    <div className="mt-7 border-[1px]">
                        <div className="flex gap-3 justify-start p-3 text-sm">
                            <PiTruckLight size={30}></PiTruckLight>
                            <div className="flex flex-col items-start gap-3 mb-4 pt-1">
                                <p>Free delivery on qualifying orders. </p>
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