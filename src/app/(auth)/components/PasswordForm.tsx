"use client";

import { useState, FormEvent } from "react"; 
import { useRouter } from "next/navigation"

import userInput from "../Hook/userInput";
import { hasMinLength } from '../utils/validation';
import Input from "./Input";
import Submit from "./Submit";

import { Login }from '../../../Services/authService';

interface PasswordFormProps {
    email: string;
    onEdit: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({email, onEdit}) => {
    const router = useRouter();
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const {value: passwordValue, 
            handleInputChange: handlePasswordChange, 
            handleInputBlur: handlePasswordBlur, 
            hasError: passwordHasError,
    } = userInput('', (value: string) => hasMinLength(value, 6));
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(passwordHasError){
            setError("Please enter a valid password");
            return;
        }
        setIsLoading(true);
        setError(null);

        try{
            const response = await Login(email, passwordValue);
            console.log("Login Success", response);
            if (response.statusCode === 200) {
                router.push("/women");
                setToastMessage(response.msg);
                setTimeout(() => {
                    alert(response.msg);
                }, 1000);
            } else {
                setError(response.message || "Login Failed");
            }
        }catch(error: any){
            setError(error.message || "Login Failed");
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="mb-6 w-full text-sm">
                <span className="tracking-widest text-gray-500 font-bold text-sm w-full">EMAIL:*</span>
                <div className="flex items-center mt-3">    
                    <p className="mr-6">{email}</p>
                    <button className="font-bold border-2 border-gray-300 px-4 py-1 hover:bg-stone-300"
                        onClick={onEdit}
                    >
                        EDIT
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-[300]">
                <Input label="PASSWORD" type="password" name="password"
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    error={passwordHasError ? 'Hey, we need a password here' : undefined}
                />
                <Submit label="SIGN IN"/>
            </form>
            <p className="mt-5 w-full text-sm">Forgot password?</p>
        </>
    )
}

export default PasswordForm;