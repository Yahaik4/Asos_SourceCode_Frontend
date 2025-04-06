"use client";
import { IoMdClose } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Image from 'next/image';

interface CartItemProps{
    id: number,
    img: string,
    price: number,
    title: string,
    size: string,
    color: string,
    quantity: number,
    onDelete: (id: number) => void,
    onSelectQuantity: (id: number, newQuantity: number) => void
}


const CartItem: React.FC<CartItemProps> = ({id, img, price, title, size, color, quantity, onDelete, onSelectQuantity}) =>{

    return (
        <div className='flex gap-3 bg-white h-fit p-4 items-start w-full'>
            <Image width={140} height={100} src={img} alt=''></Image>
            <div className='flex flex-col items-start gap-2'>
                <p className='font-bold'>${price}</p>
                <p className='text-sm font-thin text-gray-400'>{title}</p>
                <div className='flex gap-2 items-center'>
                    <div>Size: {size}</div>
                    <div className='border-l-gray-200 border-r-gray-200 border-l-2 border-r-2 px-2'>Color: {color}</div>
                    {/* <DropdownOption handleOption={handleOption} defaultValue={size[0]} options={size.filter((s, i) => i !== 0)}/>
                    <DropdownOption handleOption={handleOption} defaultValue={color[0]} options={color.filter((s, i) => i !== 0)}/> */}
                    <div>Quantity:</div>
                    <select 
                        className="text-sm hover:cursor-pointer px-1" 
                        name="size" 
                        id="" 
                        value={quantity}
                        onChange={(e) => onSelectQuantity(id, Number(e.target.value))}
                    >
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option> 
                        ))}
                    </select>
                </div>
                <button className='border-2 p-1 flex items-center gap-2 px-2'>
                    <CiHeart/> 
                    Save for later
                </button>
            </div>
            <button onClick={() => onDelete(id)}><IoMdClose size={25}></IoMdClose></button>
        </div>
    )
}

export default CartItem;