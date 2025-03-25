import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({label, error, ...props}) => {
    return (
        <>
            <span className="tracking-widest text-gray-500 font-bold text-sm">{label}:*</span>
            <input className="mt-2 h-10 px-3 border border-black outline-blue-600 mb-1" {...props} />
            {error && (
            <div className="relative">
                <div className="absolute left-4 -top-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-red-400"></div>
                <div className="p-2 bg-red-100 border-[1.5px] border-red-400 ">
                <p>{error}</p>
                </div>
            </div>
            )}

        </>
    )
}

export default Input;