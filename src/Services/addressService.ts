import { Address } from "@/app/models/Address";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_Address = `${API_DOMAIN}/Address`;

export async function fetchAllAddress() {
    try {
        const response = await fetch(API_Address, {
            method: "GET",
            credentials: "include",
        });
        
        const resData = await response.json();

        console.log("Response Status:", response.status);
        console.log("Response Data:", resData);

        if (!response.ok) { 
            throw new Error(resData.msg || 'Failed to fetch productGroups');
        }

        console.log(resData.metadata);
        return resData.metadata;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function AddNewAddress(street: string, city: string, country: string, postalCode: string) {
    try {
        const response = await fetch(API_Address, {
            method: 'POST',
            body: JSON.stringify({ street, city, country, postalCode }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'Add Failed');
        }

        return resData.metadata;
    } catch (error: any) {
        console.error("Login error:", error);
        throw error;
    }
}

// export async function UpdateCartItem(id: number, quantity: number) {
//     console.log(id);
//     console.log(quantity);
    
//     try {
//         const response = await fetch(API_Address, {
//             method: 'PUT',
//             body: JSON.stringify({ id, quantity }),
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: "include"
//         });

//         const resData = await response.json();
        

//         if (!response.ok) { 
//             throw new Error(resData.msg || 'Update Failed');
//         }

//         console.log(resData.metadata);  
//         return resData.metadata;
        
//     } catch (error: any) {
//         console.error("Login error:", error);
//         throw error;
//     }
// }


// export async function DeleteCartItem(id: number) {

//     try {
//         const response = await fetch(`${API_Address}/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: "include"
//         });

//         const resData = await response.json();

//         if (!response.ok) { 
//             throw new Error(resData.msg || 'Delete Failed');
//         }

//         return resData.metadata as boolean;
//     } catch (error: any) {
//         console.error("Delete error:", error);
//         throw error;
//     }
// }


