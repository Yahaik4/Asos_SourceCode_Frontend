import { FiShoppingBag } from "react-icons/fi";
import { PiCoatHangerBold } from "react-icons/pi";

const OrdersPage: React.FC = () => {
    return (<div className="">
        <div className="bg-white mb-3 py-3 pl-8">
            <FiShoppingBag className="my-3" size={35}></FiShoppingBag>
            <h1 className="tracking-widest text-3xl font-bold">MY ORDERS</h1>
        </div>
        <div className="bg-white flex flex-col items-center py-6">   
            <PiCoatHangerBold className="my-7" size={50}></PiCoatHangerBold>
            <p className="text-xl font-bold">You currently have no orders</p>
            <p className="text-sm my-3 text-gray-700">Best get shopping ASOS pronto…</p>
            <button className="bg-black text-white font-bold px-20 py-2">START SHOPPING</button>
        </div>
    </div>)
}

export default OrdersPage