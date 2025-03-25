import { useState } from "react";

interface ColorProps{
    colors: [],
}

const Color: React.FC<ColorProps> = ({colors}) =>{
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // const colors = ["red", "blue", "green", "yellow"];

    return (
        <div className="flex gap-2">
            {colors.map((color) => (
                <div
                    key={color}
                    className={`border-2 rounded-full p-1 cursor-pointer ${
                        selectedColor === color ? "border-4 border-black" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedColor(color)}
                >
                    <div className={`w-10 h-10 rounded-full bg-${color}-500`}></div>
                </div>
            ))}
        </div>
    );
}

export default Color;