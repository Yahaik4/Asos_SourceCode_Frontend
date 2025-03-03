import Header from "../components/Header"
import Footer from "../components/Footer"

interface layoutProps{
    children: React.FC;
}

const layout: React.FC<layoutProps> = ({children}) => {
    return (
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    )
}

export default layout;