interface BreadcrumbsProps{
    pathname: string,
}


const Breadcrumbs: React.FC<BreadcrumbsProps> = ({pathname}) =>{
    return (
        <div id="slug" className="flex py-4 px-24 text-sm text-gray-700 border border-gray-300">
            <li className="list-none">Home</li>
            {pathname.split('/').slice(1).map(item => {
                return <li key={item} className="flex pl-4 capitalize">
                    <p>{">"}</p>
                    <div className="ml-4">
                        {item}
                    </div>
                </li>
            })}
        </div>
    )
}

export default Breadcrumbs;