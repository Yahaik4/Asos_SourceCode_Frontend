import { FaFacebook, FaInstagramSquare, FaGooglePlus, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

const Footer: React.FC = () => {
    return(
        <footer className="bottom-0 w-full border-t-2 mt-16">
            <div className="flex w-full items-center justify-center gap-[50px] [&>svg]:text-[30px] py-[15px]">
                <FaFacebook />
                <FaInstagramSquare/>
                <FaGooglePlus/>
                <hr className="shrink-0 bg-slate-300 w-[1px] mr-2 h-5 "/>
                <FaCcVisa />
                <FaCcMastercard/>
                <FaCcPaypal />
            </div>
            <div className="bg-stone-100 w-full pb-10">
                <div className="mx-10 flex gap-4">
                    <ul className="w-1/4">
                        <h2 className="uppercase my-5">help & information</h2>
                        <li className="my-2 text-sm">Help</li>
                        <li className="my-2 text-sm">Track order</li>
                        <li className="my-2 text-sm">Delivery $ returns</li>
                        <li className="my-2 text-sm">Sitemap</li>
                    </ul>
                    <ul className="w-1/4">
                        <h2 className="uppercase my-5">About asos</h2>
                        <li className="my-2 text-sm">About us</li>
                        <li className="my-2 text-sm">Careers at ASOS</li>
                        <li className="my-2 text-sm">Corporate responsibility</li>
                        <li className="my-2 text-sm">Investors' site</li>
                    </ul>
                    <ul className="w-1/4">
                        <h2 className="uppercase my-5">Mobile and ASOS apps</h2>
                        <li className="my-2 text-sm">Gift vouchers</li>
                        <li className="my-2 text-sm">Black Friday</li>
                        <li className="my-2 text-sm">ASOS x Thrift</li>
                        <li className="my-2 text-sm">Discover the ASOS Credit Card</li>
                    </ul>
                    <div className="w-1/4">
                        <h2 className="uppercase my-5">Shopping from:</h2>
                    </div>
                </div>                
            </div>
        </footer>
    )
}

export default Footer