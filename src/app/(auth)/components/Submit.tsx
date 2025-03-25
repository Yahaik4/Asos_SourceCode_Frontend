
import { useFormStatus } from "react-dom";

interface SubmitProps{
    label: string;
}

const Submit: React.FC<SubmitProps> = ({label}) => {
    const { pending } = useFormStatus();

    return(
        <button className="text-white  bg-black p-3 text-center mt-3 flex justify-center items-center" type="submit"
            disabled={pending}
        >
            {!pending ? label : <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>}
        </button>
    )
}

export default Submit;