'use client'
import { usePathname } from "next/navigation"
import { MdOutlineFileUpload } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiCoatHangerBold, PiTruckLight, PiCopySimpleLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";

import imgProduct from '../../../../../../../public/Home/Women/Products/product1.avif'
// import imgProductHover from '../../../../../../public/Home/Women/Products/productHover1.avif'
import Image from "next/image"


const page: React.FC = () => {
    const pathname = usePathname();
    

    return(
        <div className="mb-16">
            <div id="slug" className="flex py-4 px-24 text-sm text-gray-700 border border-gray-300">
                <li className="list-none">Home</li>
                {pathname.split('/').slice(1).map(item => {
                    return <li key={item} className="flex pl-4 capitalize">
                        <p>></p>
                        <div className="ml-4">
                            {item}
                        </div>
                    </li>
                })}
            </div>
            <div className="flex mx-[260px] items-start justify-center mt-10">
                <div className="flex">
                    <div className="w-[40px]">

                        <Image className="pb-3" src={imgProduct} alt="" />
                        <Image className="pb-3" src={imgProduct} alt="" />
                        <Image className="pb-3" src={imgProduct} alt="" />
                        <Image className="pb-3" src={imgProduct} alt="" />

                    </div>

                    <div className="relative w-[500px] h-[650px] mx-10">
                            <Image fill className="" src={imgProduct} alt="" />
                    </div>
                </div>
                <div className="px-3 py-3 mt-6">
                    <div className="flex items-start">
                        <h1 className="mb-3 tracking-wide">ASOS DESIGN crop relaxed revere cord shirt with chest embroidery in brown</h1>
                        <MdOutlineFileUpload size={50}/>
                    </div>
                    <h1 className="mb-2 font-bold text-red-700 text-lg">Now £24.00</h1>
                    <p className="text-sm text-gray-500 tracking-widest">Was £32.00(-25%)</p>
                    
                    <div className="flex my-5 bg-blue-200 px-4 py-3 items-center gap-3">
                        <IoPricetagsOutline size={20}/>
                        <p className="font-thin ">Get 30% off! With code: <span className="font-bold">DAWN</span></p>
                    </div>


                    <div className="flex">
                        <p className="text-sm font-bold tracking-wide">COLOUR:</p>
                        <input className="" type="radio" />
                        <input className="" type="radio" />
                        <input className="" type="radio" />
                        <input className="" type="radio" />
                        <input className="" type="radio" />
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