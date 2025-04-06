import { CiCircleInfo } from "react-icons/ci";
import Button from "./Button";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { useRouter } from 'next/navigation';
interface TotalProps{
    price: number,
}

const Total: React.FC<TotalProps> = ({price}) => {
    const router = useRouter();

    function handleOnClick(){
        router.push('/check-out');
    }

    return (
        <div className='bg-white p-6 max-h-fit'>
            <div className='font-bold text-xl'>TOTAL</div>
            <div className='flex flex-col py-3 border-y-[2px] my-5'>
                <div className='flex justify-between mb-2'>
                    <div className='font-bold'>Sub-total</div>
                    <div>${price}</div>
                </div>
                <div className='flex justify-between'>
                    <div className='font-bold'>Delivery</div>
                    <CiCircleInfo size={20}/>
                </div>
            </div>
            <Button onClick={handleOnClick} title='CHECK OUT'/>

            <div className='mt-4'>
                <div className='font-bold'>WE ACCEPT:</div>
                <div className="flex gap-3 my-2">
                    <FaCcVisa size={20}/>
                    <FaCcMastercard size={20}/>
                    <FaCcPaypal size={20}/>
                    <FaCcVisa size={20}/>
                    <FaCcVisa size={20}/>
                </div>
                <p className='text-sm'>Got a discount code? Add it in the next step.</p>
            </div>
        </div>
    )
}

export default Total
