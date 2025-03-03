import Header from "../my-account/components/Header";
import SideBar from "./components/SideBar";

interface layoutProps{
    children: React.FC;
}

const layout: React.FC<layoutProps> = ({children}) => {
    return (
        <div className="bg-gray-200">
            <Header/>
            <div className="flex mx-60 justify-start gap-4">
                <SideBar />
                <div className="flex-1 h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout;