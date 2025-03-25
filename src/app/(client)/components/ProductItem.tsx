import Image from "next/image"
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface ProductItemProps{
    img: string;
    imgHover: string;
    description: string;
    price: number;
    onClick: () => void;
}


const ProductItem: React.FC<ProductItemProps> = ({img, imgHover, description, price, onClick}) => {

    const [urlImg, setUrlImg] = useState(img);
    const [iconColor, setIconColor] = useState(false);

    return <div className="mb-3 hover:cursor-pointer" onClick={onClick}>
        <div className="w-full relative h-[400px]">
            {
                <Image layout='fill' src={urlImg} alt="" 
                onMouseEnter={() => setUrlImg(imgHover)} onMouseLeave={() => setUrlImg(img)}/>
            }
            <div className="absolute bottom-0 right-0 p-2 rounded-full bg-white -translate-x-2 -translate-y-2"
                onMouseEnter={() => setIconColor(true)}
                onMouseLeave={() => setIconColor(false)}
            >
                {
                    iconColor ? <FaHeart size={20} /> : <FaRegHeart size={20}/>
                }
            </div>
        </div>
        <p className="py-2 text-sm font-normal">
            {description}
        </p>
        <p className="font-bold">
            £{price}.00
        </p>

        <div className="flex text-[10px] font-bold gap-2 mt-2 tracking-wider">
            <button className="border border-gray-200 px-1 py-1 text-[#666]">MORE COLOURS</button>
            <button className="bg-[#666] border border-black px-1 text-white">SELLING FAST</button>
        </div>
    </div>
}

export default ProductItem