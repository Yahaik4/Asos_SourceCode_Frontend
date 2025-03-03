import { MdOutlineDiscount } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaTruckFast } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { TbCircleLetterA } from "react-icons/tb";

const page: React.FC = () => {
    return (
        <div className="w-full flex items-center justify-center h-screen">
            <div className="flex flex-col items-center max-w-[400px] h-full justify-center">
                <TbCircleLetterA size={100}/>
                <div className="mb-12 w-full">
                    <h1 className="font-bold text-2xl mb-4">Hi friend!</h1>
                    <p className="text-sm">Enter your email to sign in or join for</p>
                </div>
                <div className="flex gap-12 mb-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 rounded-full border-2 border-black mb-2">
                            <MdOutlineDiscount className="" size={30}/>
                        </div>
                        <p>Exclusive discounts</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 rounded-full border-2 border-black mb-2">
                            <AiOutlineDeliveredProcedure size={30}/>
                        </div>
                        <p>Exclusive discounts</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="p-4 rounded-full border-2 border-black mb-2">
                            <FaTruckFast size={30}/>
                        </div>
                        <p>Exclusive discounts</p>
                    </div>
                </div>
                <form className="flex flex-col w-full">
                    <span className="tracking-widest text-gray-500 font-bold text-sm">EMAIL:*</span>
                    <input className="my-2 h-10 px-3 border border-black outline-blue-600 mb-7" type="email"/>
                    <button className="text-white  bg-black p-3 text-center">CONTINUE</button>
                </form>
                <div className="flex mt-8 justify-between w-full items-center text-gray-500">
                    <div className="flex-1 h-[1px] border-b-2 border-gray-300"></div>
                    <span className="flex-0 px-5 text-center text-sm">or continue with</span>
                    <div className="flex-1 h-[1px] border-b-2 border-gray-300"></div>
                </div>
                <div className="flex justify-evenly mt-5 w-full">
                    <button className="border-2 border-gray-400 p-2">
                        <FcGoogle size={30} className=""/>
                    </button>
                    <button className="border-2 border-gray-400 p-2">
                        <BsFacebook size={30}  color="blue"/>
                    </button>
                    <button className="border-2 border-gray-400 p-2">   
                        <FaApple size={30} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page