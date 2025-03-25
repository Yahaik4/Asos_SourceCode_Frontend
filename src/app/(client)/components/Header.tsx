'use client'
import logoImg from '../../../../public/logo.svg'
import { FaSearch, FaRegUser, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import Dialog  from './Dialog'
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { fetchAllProductGroup } from '@/Services/productGroup';
import { useFetch } from '@/Hook/useFetch';
import { ProductGroup } from '@/app/models/ProductGroup';

const Header: React.FC = () => {
    const pathname = usePathname();
    console.log(pathname);
    
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
    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen);
    
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
            <li className='px-4 hover:cursor-pointer'><FaRegHeart size={20}></FaRegHeart></li>
            <li className='px-4 hover:cursor-pointer'><FaShoppingCart size={20}></FaShoppingCart></li>
        </ul>
    )
}


const NavBar: React.FC = () => {
    const { isFetching, fetchedData: productGroups, error } = useFetch<ProductGroup[]>(fetchAllProductGroup , []);

    if(isFetching) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>

    return (
        <nav className='bg-stone-700'>
            <ul className="flex justify-start text-sm px-8 mx-10 items-center h-14 relative">
                <Dialog 
                    className={'w-[90svw] translate-y-[70%]'}
                    trigger={
                        <NavItem>New in</NavItem>
                    }
                    content={
                        <div className='w-full h-[80px] bg-red-100'>
                            abf
                        </div>
                    }
                />
                {productGroups.map((item) => {
                    return (
                        <Dialog 
                            key={item.id}
                            className={'w-[90svw] translate-y-[70%]'}
                            trigger={
                                <NavItem>{item.name}</NavItem>
                            }
                            content={
                                <div className='w-full h-[80px] bg-red-100'>
                                    abf
                                </div>
                            }
                        />
                    )
                })}
        
                {/* <NavItem>Clothing</NavItem>
                <NavItem>Trending</NavItem>
                <NavItem>Dresses</NavItem>
                <NavItem>Shoes</NavItem>
                <NavItem>Face + Body</NavItem>
                <NavItem>Brands </NavItem> */}
            </ul>

        </nav>
    )
}

interface NavItemProps{
    children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen);
    
    return (
        <>
            <li className='px-3 relative group hover:cursor-pointer hover:bg-stone-200 hover:text-gray-800 h-full flex items-center' 
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                {children}
                {/* <div className='absolute w-fit bottom-0 left-0 translate-y-full hidden group-hover:block bg-white z-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique deleniti rem neque, animi quibusdam dolor perferendis obcaecati minus nihil corporis illum ut numquam nesciunt eaque deserunt, labore assumenda dolorum voluptatibus?</div> */}
            </li>
            {/* <Dialog isOpen={isOpen} className="max-w-[95%]"/> */}
        </>
    )
}


export default Header


