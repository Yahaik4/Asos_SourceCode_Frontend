import Image from 'next/image'
import imgLogo from '../../../../../public/logo.svg'


const Header: React.FC = () => {
    return <header className='flex justify-center items-center py-8 mx-60'>
            <div className='w-1/3'>
                <Image className='hover:cursor-pointer px-3 mx-2 text-start w-[120px]' src={imgLogo} alt="" />
            </div>
            <h1 className='w-2/3 font-bold text-2xl'>MY ACCOUNT</h1>
    </header>
}

export default Header