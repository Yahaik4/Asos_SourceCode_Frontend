import { CartItemModel } from "@/app/models/CartItemModel";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_CartItem = `${API_DOMAIN}/cart`;

export async function fetchAllCartItem() {
    try {
        const response = await fetch(API_CartItem, {
            method: "GET",
            credentials: "include",
        });
        
        const resData = await response.json();

        console.log("Response Status:", response.status);
        console.log("Response Data:", resData);

        if (!response.ok) { 
            throw new Error(resData.msg || 'Failed to fetch productGroups');
        }

        return resData.metadata;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function AddCartItem(variantId: number, quantity: number) {
    console.log(variantId);
    console.log(quantity);
    
    try {
        const response = await fetch(API_CartItem, {
            method: 'POST',
            body: JSON.stringify({ variantId, quantity }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'Add Failed');
        }

        return resData.metadata as CartItemModel;
    } catch (error: any) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function UpdateCartItem(id: number, quantity: number) {
    console.log(id);
    console.log(quantity);
    
    try {
        const response = await fetch(API_CartItem, {
            method: 'PUT',
            body: JSON.stringify({ id, quantity }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        const resData = await response.json();
        

        if (!response.ok) { 
            throw new Error(resData.msg || 'Update Failed');
        }

        console.log(resData.metadata);  
        return resData.metadata;
        
    } catch (error: any) {
        console.error("Login error:", error);
        throw error;
    }
}


export async function DeleteCartItem(id: number) {

    try {
        const response = await fetch(`${API_CartItem}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'Delete Failed');
        }

        return resData.metadata as boolean;
    } catch (error: any) {
        console.error("Delete error:", error);
        throw error;
    }
}


