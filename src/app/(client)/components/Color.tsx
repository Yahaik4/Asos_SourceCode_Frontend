import { useState } from "react";
import { useEffect } from "react";

interface ColorProps {
    colors: string[],
    handleOption: (data: { color: string}) => void,
}

const Color: React.FC<ColorProps> = ({ colors, handleOption }) => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    

    useEffect(() => handleOption({color: selectedColor || ''}), [selectedColor]);

    return (
        <div className="flex gap-2">
            {colors.map((color) => (
                <div
                    key={color}
                    className={`flex items-center justify-center border-2 rounded-full p-[2px] cursor-pointer ${
                        selectedColor === color ? "border-2 border-black" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedColor(color)}
                >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                </div>
            ))}
        </div>
    );
};

export default Color;
