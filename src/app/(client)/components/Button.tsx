interface ButtonProps{
    title: string,
    onClick: () => void,
}


const Button: React.FC<ButtonProps> = ({title, onClick}) =>{
    return (
        <button className="bg-green-700 px-24 py-3 font-bold text-white" onClick={onClick}>{title}</button>
    )
}

export default Button;