'use client'
import { BsBag } from "react-icons/bs";
import CartItem from '../../components/CartItem';
import Total from '../../components/Total';
import Button from "../../components/Button";
import img from '../../../../../public/Home/Women/homeNav.avif';
import { useFetch } from '@/Hook/useFetch';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from "react-toastify";

import CartItemModel from '@/app/models/CartItemModel';
import { DeleteCartItem, fetchAllCartItem, UpdateCartItem } from '@/Services/cartService';
import { useCart } from "../../Context/CartContext";

export default function(){
    // const [variantData, setVariantData] = useState({
    //     colors: new Set<string>(),
    //     sizes: new Set<string>()
    // });
    const [cartItem, setCartItem] = useState<CartItemModel[]>([]);

    const { isFetching, fetchedData , error } = useFetch<CartItemModel[]>(fetchAllCartItem , []);
    useEffect(() => {
        if (fetchedData) {
            setCartItem(fetchedData);
        }
    }, [fetchedData]);

    // useEffect(() => {
    //     const newColorSet = new Set<string>();
    //     const newSizeSet = new Set<string>();

    //     cartItem?.forEach((item) => {
    //         if(item?.color){
    //             newColorSet.add(item.color);
    //         }
    //         if(item?.size){
    //             newSizeSet.add(item.size);
    //         }
    //     })
    //     setVariantData({
    //         colors: newColorSet,
    //         sizes: newSizeSet
    //     });
    // }, [cartItem])

    if(isFetching) return <p>Loading...</p>

    console.log(cartItem);

    // console.log("Unique Colors:", Array.from(variantData.colors));
    // console.log("Unique Sizes:", Array.from(variantData.sizes));
    var subTotal = 0;
    cartItem.map(item => {
        subTotal += item.price;
    })

    const { cartItems, setCartItems } = useCart();
    const handleDelete = async (id: number) => {
        try{
            await DeleteCartItem(id);
            setCartItem(prev => {
                const updatedCart = prev.filter(item => item.id !== id);
                setCartItems(updatedCart); 
                return updatedCart;
            });

            toast.success("Deleted item successfully!", {
                position: "top-right",
                autoClose: 1000,
            });
        }catch(error){
            console.log(error);
            toast.error("Failed to delete item!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }
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
        error ? (
            <div className='flex justify-center gap-4 pt-4 pb-16 mt-20'>
                <div className="flex flex-col items-center gap-3"> 
                    <BsBag size={30}/> 
                    <p className="text-xl font-bold">You are not logged in</p>
                    <p>Please sign in to access your cart.</p>
                    <Button title="SIGN IN" onClick={() => window.location.href = "/login"} />
                </div>
            </div>
        ) : cartItem.length === 0 ? ( 
            <div className='flex justify-center gap-4 pt-4 pb-16 mt-20'>
                <div className="flex flex-col items-center gap-3"> 
                    <BsBag size={30}/> 
                    <p className="text-xl font-bold">Your bag is empty</p>
                    <p>Start shopping now to fill your cart!</p>
                    <Button title="SHOP NOW" onClick={() => window.location.href = "/women"}/>
                </div>
            </div>
        ) : ( 
            <div className='flex justify-center gap-4 pt-4 bg-stone-100 pb-16'>
                <ToastContainer />
                <div className='flex flex-col gap-3'>
                    {cartItem.map(item => (
                        <CartItem 
                            key={item.id} 
                            id= {item.id}
                            img={item.imageUrl} 
                            price={item.price} 
                            title={item.productName} 
                            size={item.size} 
                            color={item.color} 
                            quantity={item.quantity} 
                            onDelete={handleDelete}
                            // onUpdate={handleUpdateCartItem}
                            // variant={item.}
                            onSelectQuantity={handleUpdateQuantity}
                        />
                    ))}
                </div>
                <Total price={subTotal} />
            </div>
        )
    );
    
    
}