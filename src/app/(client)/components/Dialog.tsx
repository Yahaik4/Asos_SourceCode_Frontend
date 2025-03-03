interface dialogProps{
    trigger: React.ReactNode;
    content: React.ReactNode;
    className: String;
}


const Dialog: React.FC<dialogProps> = ({trigger, content, className}) => {
    return (
        <div className={`group relative h-full`}>    
            {trigger}
            <div className={`absolute hidden top-0 left-0 bg-white z-50 text-black shadow group-hover:block hover:block ${className}`}>
                {content}
            </div>
        </div>
    )
}

export default Dialog