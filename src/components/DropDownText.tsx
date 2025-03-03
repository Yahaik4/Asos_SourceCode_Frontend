import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

interface DropdownProps{
    children: string;
}

const DropDownText: React.FC<DropdownProps> = ({children}) => {
    const [open, setOpen] = useState(false);
    const text = children.split(" ").slice(0, 15).join(" ");

    return open ? <button className="mt-3 w-1/3 flex items-center text-sm" onClick={() => setOpen(!open)}>
        <p>{children}</p>
        <RiArrowDropUpLine size={30} className="shrink-0"/>
    </button> : <button className="mt-3 w-1/3 flex items-center text-sm" onClick={() => setOpen(!open)}>
        <p>{text}...</p>
        <RiArrowDropDownLine size={30}/>
    </button>
}

export default DropDownText