"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchAllCartItem } from "@/Services/cartService";
import CartItemModel from "@/app/models/CartItemModel";

interface CartContextType {
    cartItems: CartItemModel[];
    setCartItems: (items: CartItemModel[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItemModel[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            const fetchedData = await fetchAllCartItem();
            setCartItems(fetchedData);
        };
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
