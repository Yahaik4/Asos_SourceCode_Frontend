'use client'
import logoImg from '../../../../public/logo.svg'
import { FaSearch, FaRegUser, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import Dialog  from './Dialog'
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { fetchAllProductGroup } from '@/Services/productGroup';
// import { fetchFilteredProducts } from '@/Services/productService';
import { useFetch } from '@/Hook/useFetch';
import { ProductGroup } from '@/app/models/ProductGroup';

import { useCart } from '../Context/CartContext';

const Header: React.FC = () => {
    const pathname = usePathname();
    
    
    return (
        <header className='text-white'>
            <div className='bg-stone-950 h-16'>
                <div className='flex items-center px-8 mx-10 h-full text-center'>
                    <Image className='invert hover:cursor-pointer px-3 mx-2' src={logoImg} alt="" />
                    <nav className='flex uppercase text-xl font-semibold h-full items-center hover:cursor-pointer border-r border-gray-400'>
                        {
                            (pathname.split('/').includes('women')) ?
                            <>
                                <div className='text-sm px-8 flex items-center h-full bg-stone-700'>Women</div> 
                                <Link href={'/men'} className='text-sm px-8 flex items-center h-full hover:bg-stone-700'>Men</Link>
                            </> :
                            <>
                                <Link href={'/women'} className='text-sm px-8 flex items-center h-full hover:bg-stone-700'>Women</Link> 
                                <div className='text-sm px-8 flex items-center h-full bg-stone-700'>Men</div>
                            </>    
                        }

                    </nav>
                    <SearchBar />
                    <HeaderIcons />
                </div>
            </div>
            <NavBar />
        </header>
    )
}


const SearchBar: React.FC = () =>{
    return (
        <div className="relative flex w-full h-full items-center px-6 py-3 ">
            <input 
                placeholder="Search for items and brands" 
                type="search" 
                className="w-full h-10 rounded-3xl pl-4 pr-10 focus:outline-none text-black" 
            />
            <button className="absolute right-9 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaSearch />
            </button>
        </div>
    )
}

const HeaderIcons: React.FC = () => {
    const { cartItems } = useCart();

    return(
        <ul className='flex h-full items-center'>
            <Dialog 
                className={'translate-y-[30%] -translate-x-[50%] w-[300px]'}
                trigger={
                    <div className='h-full flex items-center px-4 hover:cursor-pointer'>
                        <FaRegUser size={20}/>
                    </div>
                }
                content={
                    <>
                        <div className="flex justify-between">
                            <div className='p-3'>
                                <a className='pr-1 border-r-2 border-gray-400' href="/login">Sign In</a>
                                <a className='pl-1' href="">Sign Up</a>
                            </div>
                            <button className='p-3'><IoCloseSharp size={25}></IoCloseSharp></button>
                        </div>
                        <ul className="flex-col ">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <a href="/my-account">My Account</a>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                My Orders
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Returns Information
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Contact  Preferences
                            </li>
                        </ul>
                    </>
                }
            />
            <a href="">
                <li className='px-4 hover:cursor-pointer'><FaRegHeart size={20}></FaRegHeart></li>
            </a>
            <a href="/cart">
                <li className='px-4 hover:cursor-pointer relative'>
                    <FaShoppingCart size={20}>
                    </FaShoppingCart>
                    {cartItems.length > 0 && <div className="absolute bottom-0 right-0 bg-red-500 -translate-x-2 translate-y-2 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {cartItems.length}
                    </div>}
                </li>
            </a>
        </ul>
    )
}


const NavBar: React.FC = () => {
    const { isFetching, fetchedData: productGroups, error } = useFetch<ProductGroup[]>(fetchAllProductGroup , []);
    console.log("productGroups:", productGroups);
    
    if(isFetching) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>

    return (
        <nav className='bg-stone-700'>
            <ul className="flex justify-start text-sm px-8 mx-10 items-center h-14 relative">

                {productGroups.map((item) => {
                    return (
                        <NavItem key={item.id} children={item.name} />
                    )
                })}
            </ul>
        </nav>
    )
}

interface NavItemProps{
    children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const gender = pathname.split('/')[1];
    const targetPath = `/${gender}/${children}`;
    const isActive = pathname === targetPath;
  
    function handleOnClick() {
        if (isActive) return;
        router.push(targetPath);
    }

    return (
        <>
            <li
                className={`px-3 relative group hover:cursor-pointer h-full flex items-center 
                    ${isActive ? 'bg-stone-200 text-gray-800' : 'hover:bg-stone-200 hover:text-gray-800'}`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={handleOnClick}
            >
                {children}
            </li>
        </>
    )
}


export default Header


