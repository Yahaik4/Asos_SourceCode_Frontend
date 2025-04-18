import { FiShoppingBag, FiGift } from "react-icons/fi";
import { IoMdHelpCircleOutline } from "react-icons/io";

const SideBar: React.FC = () => {
    return <div className='flex flex-col justify-center items-start w-fit h-fit'>
            <div className="flex items-center gap-3 bg-white py-7 pl-3 pr-20">
                <div className="py-7 px-6 rounded-full bg-black">
                    <h1 className="text-3xl font-bold text-white">HQ</h1>
                </div>
                <div>
                    <p>Hi,</p>
                    <h1 className="font-bold">Huy Quang</h1>
                </div>
                
            </div>
            <ul className="w-full ">
                <li className="my-2 flex px-4 items-center gap-4 bg-white py-3">
                    <FiShoppingBag className="" size={20}/>
                    <p className="font-normal">My orders</p>
                </li>

                <li className="my-2 flex px-4 items-center gap-4 bg-white py-3">
                    <IoMdHelpCircleOutline className="" size={20}/>
                    <p className="">Need help?</p>
                </li>
                
                <li className="my-2 flex px-4 items-center gap-4 bg-white py-3">
                    <FiGift className="" size={20}/>
                    <p className="">Gift cards & vouchers</p>
                </li>

                <li className="my-2 flex px-4 items-center gap-4 bg-white py-3">
                    <FiGift className="" size={20}/>
                    <p className="">Gift cards & vouchers</p>
                </li>
                <li className="my-2 flex px-4 items-center gap-4 bg-white py-3">
                    <FiGift className="" size={20}/>
                    <p className="">Gift cards & vouchers</p>
                </li>
                <li className="my-2 flex px-4 items-center gap-4 bg-white py-3">
                    <FiGift className="" size={20}/>
                    <p className="">Gift cards & vouchers</p>
                </li>
                <li className="my-2 flex px-4 items-center gap-4 bg-white py-3">
                    <FiGift className="" size={20}/>
                    <p className="">Gift cards & vouchers</p>
                </li>
                <li className="my-2 flex px-4 items-center gap-4 bg-white py-3">
                    <FiGift className="" size={20}/>
                    <p className="">Gift cards & vouchers</p>
                </li>
            </ul>
    </div>
}

export default SideBar