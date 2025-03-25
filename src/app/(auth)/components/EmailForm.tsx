import { MdOutlineDiscount } from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaTruckFast } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FormEvent } from "react";

import Input from "./Input";
import userInput from "../Hook/userInput";
import {isEmail, isNotEmpty} from '../utils/validation';
import Submit from "./Submit";

interface EmailFormProps {
    defaultEmail: string;
    onSubmit: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({defaultEmail = "", onSubmit}) => {
    const {value: emailValue, 
        handleInputChange: handleEmailChange, 
        handleInputBlur: handleEmailBlur, 
        hasError: emailHasError,
        setValue,
    } = userInput(defaultEmail, (value: string) => isEmail(value) && isNotEmpty(value));

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(emailValue);
        if(!emailHasError){
            onSubmit(emailValue);
        }
    }

    return (
        <>
            <div className="mb-6 w-full text-sm">
                Enter your email to sign in or join for
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
            <form onSubmit={handleSubmit} className="flex flex-col w-full">
                <Input label="EMAIL" type="email" name="email"
                    value={emailValue}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    error={emailHasError ? 'Oops! Please type in your correct email address' : undefined}
                />
                <Submit label="CONTINUE"/>
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
        </>
    )
}

export default EmailForm;