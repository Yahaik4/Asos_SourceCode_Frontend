import { useState } from "react"

interface DropdownOptionProps{
    defaultValue: string,
    options: string[],
    handleOption: (data: {size: string }) => void,
}

const DropdownOption: React.FC<DropdownOptionProps> = ({defaultValue, options, handleOption}) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);
        handleOption({size: selectedValue});
    }

    return (
        <select className="text-sm p-2 border-2 border-black hover:cursor-pointer" name="size" onChange={handleChange} value={selectedValue}>
            <option value="" disabled>{defaultValue}</option>
            {options.map((option) => {
                return <option key={option} value={option}>{option}</option>
            })
            }
        </select>
    )
}

export default DropdownOption;