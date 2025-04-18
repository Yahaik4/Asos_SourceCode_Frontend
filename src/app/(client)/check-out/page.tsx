'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import imgLogo from '../../../../public/logo.svg';

import CartItem from '../components/CartItem';
import { useState, useEffect } from 'react';
import { CartItemModel } from '@/app/models/CartItemModel';
import { Address } from '@/app/models/Address';
import { DeleteCartItem, fetchAllCartItem, UpdateCartItem } from '@/Services/cartService';
import { useFetch } from '@/Hook/useFetch';
import { fetchAllAddress } from '@/Services/addressService';
import { CreateOrder, addOrderItem } from '@/Services/orderService';
import { CreatePaymentIntent, ConfirmPayment } from '@/Services/paymentService';

const CheckOutPage: React.FC = () => {
    const router = useRouter();
    const [cartItem, setCartItem] = useState<CartItemModel[]>([]);
    const [address, setAddress] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'momo'>();
    const [isProcessing, setIsProcessing] = useState(false);

    const { fetchedData: cartData } = useFetch<CartItemModel[]>(fetchAllCartItem, []);
    const { fetchedData: addressData } = useFetch<Address[]>(fetchAllAddress, []);

    useEffect(() => {
        if (cartData) setCartItem(cartData);
    }, [cartData]);

    useEffect(() => {
        if (addressData) setAddress(addressData);
    }, [addressData]);

    const subTotal = cartItem.reduce((total, item) => total + item.price, 0);
    const selectedAddress = address.find(a => a.id === selectedAddressId);

    const handleDelete = async (id: number) => {
        await DeleteCartItem(id);
        setCartItem(prev => prev.filter(item => item.id !== id));
    };

    const handleUpdateQuantity = async (id: number, newQuantity: number) => {
        const updatedItem = await UpdateCartItem(id, newQuantity);
        setCartItem(prev =>
            prev.map(item => (item.id === id ? updatedItem : item))
        );
    };

    const handleClickBuy = async (addressId: number, totalPrice: number) => {
        if (isProcessing) return; 
        setIsProcessing(true); 
        if(paymentMethod === 'momo'){
            try{
                const createOrder = await CreateOrder(addressId, totalPrice);
        
                for (const item of cartItem) {
                    await addOrderItem(createOrder.id, item.variantId, item.quantity, item.price);
                }
    
                const res = await CreatePaymentIntent(totalPrice, paymentMethod, createOrder.id);
                console.log(res);
    
                if (res?.payUrl) {
                    const fakePaymentIntentId = "fake_payment_intent_id"; 
                    const fakeTransactionId = "fake_transaction_id";
    
                    const metadata = await ConfirmPayment(
                        createOrder.id,
                        "Momo",
                        fakePaymentIntentId,
                        fakeTransactionId,
                        "Wallet", 
                        totalPrice
                    );
    
                    console.log("Momo payment confirmed, metadata:", metadata);
                    
                    router.push(`/payment-success?orderId=${createOrder.id}&payment_method=momo`);
                }
            } catch (error) {
                console.error('Error while creating order:', error);
            }
            finally {
                setIsProcessing(false);
            }
        }
    
        if(paymentMethod === 'stripe'){
            try{
                const createOrder = await CreateOrder(addressId, totalPrice);
                for (const item of cartItem) {
                    await addOrderItem(createOrder.id, item.variantId, item.quantity, item.price);
                }
                router.push(`/payment?orderId=${createOrder.id}&payment_method=${paymentMethod}`);
            } catch (error) {
                console.error('Error while creating order:', error);
            }
        }
    };
    

    return (
        <div className='bg-stone-100'>
            <header className='flex justify-center items-center py-8 mx-72'>
                <div className='flex-1 ml-2'>
                    <Image className='hover:cursor-pointer px-3 mx-2 text-start w-[120px]' src={imgLogo} alt="Logo" />
                </div>
                <h1 className='flex-1 font-bold text-3xl'>CHECK OUT</h1>
            </header>

            <div className='flex gap-5 mx-60 justify-start'>
                <div className='w-[400px]'>
                    <form className='flex flex-col items-start uppercase bg-white p-6 h-fit'>
                        <p className='mb-4 font-bold tracking-widest'>Delivery address</p>
                        {selectedAddress ? (
                            <>
                                <p className='font-bold tracking-widest'>Selected Address</p>
                                <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>Street</span>
                                <input value={selectedAddress.street} className='w-full p-2 border-black border-[1.5px]' readOnly />
                                <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>City</span>
                                <input value={selectedAddress.city} className='w-full p-2 border-black border-[1.5px]' readOnly />
                                <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>Country</span>
                                <input value={selectedAddress.country} className='w-full p-2 border-black border-[1.5px]' readOnly />
                                <span className='mt-4 mb-2 font-bold text-gray-400 tracking-wide'>Postal Code</span>
                                <input value={selectedAddress.postalCode} className='w-full p-2 border-black border-[1.5px]' readOnly />

                                {confirmMessage && (
                                    <p className="text-green-600 mt-2 text-sm font-medium">
                                        {confirmMessage}
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className='font-bold tracking-widest'>No address selected</p>
                        )}

                        <button
                            type='button'
                            onClick={() => setShowAddressModal(true)}
                            className='mt-4 uppercase p-4 font-bold border-2 w-full bg-black text-white hover:bg-gray-100 hover:text-black'
                        >
                            {selectedAddress ? 'Choose Another Address' : 'Choose Delivery Address'}
                        </button>
                    </form>
                </div>

                <div className='bg-white p-6 w-fix'>
                    <div className='flex justify-between pb-4 px-4'>
                        <p className='font-bold tracking-widest text-lg'>{cartItem.length} ITEMS</p>
                        <p>Edit</p>
                    </div>
                    <div className='flex flex-col border-t-gray-200 border-b-gray-200 border-t-2 border-b-2'>
                        {cartItem.length > 0 ? (
                            cartItem.map(item => (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    img={item.imageUrl}
                                    price={item.price}
                                    title={item.productName}
                                    size={item.size}
                                    color={item.color}
                                    quantity={item.quantity}
                                    onDelete={handleDelete}
                                    onSelectQuantity={handleUpdateQuantity}
                                />
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                    <div>
                        <div className='flex justify-between my-4'>
                            <p>Subtotal</p>
                            <p>${subTotal.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between font-bold'>
                            <p className='uppercase'>Subtotal to Pay</p>
                            <p>${subTotal.toFixed(2)}</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-bold uppercase mb-2">Select Payment Method</h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setPaymentMethod('stripe')}
                                    className={`px-4 py-2 border-2 rounded ${
                                        paymentMethod === 'stripe' ? 'bg-black text-white' : 'bg-white text-black'
                                    }`}
                                >
                                    Stripe
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('momo')}
                                    className={`px-4 py-2 border-2 rounded ${
                                        paymentMethod === 'momo' ? 'bg-black text-white' : 'bg-white text-black'
                                    }`}
                                >
                                    Momo
                                </button>
                            </div>
                        </div>
                        <button
                            disabled={!selectedAddress || !paymentMethod}
                            className={`flex flex-col uppercase w-full items-center p-6 h-fit mt-4 border-2 font-bold ${
                                selectedAddress&&paymentMethod ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            onClick={() => handleClickBuy(selectedAddressId || 0, subTotal)}
                        >
                            Buy Now
                        </button>
                        {!selectedAddress && (
                            <p className="text-red-500 mt-2 text-sm">Please choose a delivery address to proceed.</p>
                        )}
                        {!paymentMethod && (
                            <p className="text-red-500 mt-2 text-sm">Please choose a payment method to proceed.</p>
                        )}
                    </div>
                </div>
            </div>

            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[400px] relative">
                        <button
                            onClick={() => setShowAddressModal(false)}
                            className="absolute top-2 right-2 text-xl font-bold"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-bold mb-4 uppercase">Choose Address</h2>
                        {address.length > 0 ? (
                            <ul className="space-y-2 max-h-60 overflow-y-auto">
                                {address.map(addr => (
                                    <li
                                        key={addr.id}
                                        className={`border p-3 rounded cursor-pointer hover:bg-gray-100 
                                            ${selectedAddressId === addr.id ? 'bg-gray-100 font-bold' : ''}`}
                                        onClick={() => {
                                            setSelectedAddressId(addr.id);
                                            setShowAddressModal(false);
                                            setConfirmMessage('');
                                        }}
                                    >
                                        <p>{addr.street}, {addr.city}</p>
                                        <p>{addr.country}, {addr.postalCode}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No addresses available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckOutPage;