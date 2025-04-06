"use client";
import imgLogo from '../../../../public/logo.svg'
import Image from 'next/image'
import CartItem from '../components/CartItem'

import { useState, useEffect } from 'react'
import { CartItemModel } from '@/app/models/CartItemModel';
import { Address } from '@/app/models/Address';
import { DeleteCartItem, fetchAllCartItem, UpdateCartItem } from '@/Services/cartService'
import { useFetch } from '@/Hook/useFetch';
import { fetchAllAddress, AddNewAddress } from '@/Services/addressService';

const CheckOutPage: React.FC = () => {

    const [cartItem, setCartItem] = useState<CartItemModel[]>([]);
    const [address, setAddress] = useState<Address[]>([]);

    const { isFetching: isFetchingCart, 
        fetchedData: cartData , 
        error: cartError } = useFetch<CartItemModel[]>(fetchAllCartItem , []);
    useEffect(() => {
        if (cartData) {
            setCartItem(cartData);
        }
    }, [cartData]);

    const { isFetching: isFetchingAddress, 
        fetchedData: addressData , 
        error: addressError } = useFetch<Address[]>(fetchAllAddress , []);
    useEffect(() => {
        if (addressData) {
            setAddress(addressData);
        }
    }, [addressData]);

    console.log(addressData);

    async function handleAddAddress (e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const street = formData.get("street") as string;
        const city = formData.get("city") as string;
        const country = formData.get("country") as string;
        const postalCode = formData.get("postalCode") as string;

        // console.log(Data);
        try {
            const response = await AddNewAddress(street, city, country, postalCode);
            console.log("Address added:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    

    const handleDelete = async (id: number) => {
        try{
            await DeleteCartItem(id);
            setCartItem(prev => {
                const updatedCart = prev.filter(item => item.id !== id);
                return updatedCart;
            });

            // toast.success("Deleted item successfully!", {
            //     position: "top-right",
            //     autoClose: 1000,
            // });
        }catch(error){
            console.log(error);
        }
    }
    var subTotal = 0;
    cartItem.map(item => {
        subTotal += item.price;
    })

    const handleUpdateQuantity = async (id: number, newQuantity: number) => {
        try{
            const updatedItem = await UpdateCartItem(id, newQuantity);
            setCartItem(prevCart => 
                prevCart.map(item => 
                    item.id === id ? updatedItem : item
                )
            )
        }catch(error){
            console.log(error);
        }
    };


    

    return (
        <div className='bg-stone-100'>
            <header className='flex justify-center items-center py-8 mx-60'>
                <div className='w-1/3'>
                    <Image className='hover:cursor-pointer px-3 mx-2 text-start w-[120px]' src={imgLogo} alt="" />
                </div>
                <h1 className='w-2/3 font-bold text-3xl'>CHECK OUT</h1>
            </header>
            <div className='flex gap-4 mx-60 h-fit'>
                <form onSubmit={handleAddAddress} className='flex flex-col items-start uppercase bg-white p-6 h-fit'>
                    <p className=' mb-4 font-bold tracking-widest'>Delivery address</p>
                    <p className='font-bold tracking-widest'>Add address</p>
                    <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>Name:</span>
                    <input className='w-full p-2 border-black border-[1.5px]' type="text" />
                    <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>Street</span>
                    <input name='street' className='w-full p-2  border-black border-[1.5px]' type="text" />
                    <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>City</span>
                    <input name='city' className='w-full p-2 border-black border-[1.5px]' type="text" />
                    <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>Country</span>
                    <input name='country' className='w-full p-2 border-black border-[1.5px]' type="text" />
                    <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>PostalCode</span>
                    <input name='postalCode' className='w-full p-2 border-black border-[1.5px]' type="text" />

                    <button type='submit' className='mt-10 uppercase p-4 bg-black text-white font-bold tracking-widest'>Delivery to this Address</button>
                </form>
                <div className='bg-white p-6'>
                    <div className='flex justify-between pb-4 px-4'>
                        <p className='font-bold tracking-widest text-lg'>3 ITEMS</p>
                        <p>Edit</p>
                    </div>
                    <div className='flex flex-col border-t-gray-200 border-b-gray-200 border-t-2 border-b-2'>
                        {cartItem.length > 0 ? (
                            cartItem.map(item => (
                                <CartItem key={item.id} id={item.id} img={item.imageUrl} price={item.price} title={item.productName} 
                                    size={item.size} color={item.color} quantity={item.quantity} 
                                    onDelete={handleDelete} 
                                    onSelectQuantity={handleUpdateQuantity} />
                                ))
                        ) : (
                            <p>Loading cart items...</p>
                        )}
                    </div>
                    <div>
                        <div className='flex justify-between my-4'>
                            <p>Subtotal</p>
                            <p>${subTotal}</p>
                        </div>
                        <div className='flex justify-between font-bold'>
                            <p className='uppercase'>Subtotal to Pay</p>
                            <p>$68.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPage