import Header from "../components/Header"
import Footer from "../components/Footer"
import { CartProvider } from "../Context/CartContext";

interface layoutProps{
    children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({children}) => {
    return (
        <>
            <CartProvider>
                <Header></Header>
                    {children}
                <Footer></Footer>
            </CartProvider>
        </>
    )
}

export default layout;