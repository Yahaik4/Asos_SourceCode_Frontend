import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

interface DropDownListProps {
    title: string;
    items: string[];
}

const DropDownList: React.FC<DropDownListProps> = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const toggleItem = (item: string) => {
        setSelectedItems((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const clearSelection = () => {
        setSelectedItems([]);
    };

    return (
        <div className="relative w-[220px]">
            <button
                className="flex justify-between items-center w-full bg-stone-100 border-y border-gray-300 p-2 shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                {isOpen ? <RiArrowDropUpLine size={24} /> : <RiArrowDropDownLine size={24} />}
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-[350px] bg-white border border-gray-300 shadow-lg rounded-md z-10">
                    
                    <div className="flex justify-between items-center w-full p-3 border-b border-gray-200">
                        <div>
                            <p className="text-sm text-gray-500">{selectedItems.length} selected</p>
                            <p className="text-gray-600 font-medium text-sm">
                                {selectedItems.join(", ")}
                            </p>
                        </div>
                        <button
                            className="border border-black px-3 py-1 text-sm font-semibold"
                            onClick={clearSelection}
                        >
                            CLEAR
                        </button>
                    </div>
                    

                    <div className="max-h-[200px] overflow-y-auto px-3">
                        {items.map((item) => (
                            <button
                                key={item}
                                className={`w-full text-start p-3 border border-gray-200 rounded-md my-1 ${
                                    selectedItems.includes(item) ? "bg-blue-600 text-white font-bold" : "bg-white text-black"
                                }`}
                                onClick={() => toggleItem(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownList;
