const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_Order = `${API_DOMAIN}/order`;

export async function fetchAllOrder() {
    try {
        const response = await fetch(API_Order, {
            method: "GET",
            credentials: "include",
        });
        
        const resData = await response.json();

        // console.log("Response Status:", response.status);
        // console.log("Response Data:", resData);

        if (!response.ok) { 
            throw new Error(resData.msg || 'Failed to fetch productGroups');
        }

        // console.log(resData.metadata);
        return resData.metadata;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function CreateOrder(addressId: number, totalPrice: number) {
    try {
        const response = await fetch(API_Order, {
            method: 'POST',
            body: JSON.stringify({ addressId, totalPrice }),
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

export async function addOrderItem(OrderId: number, ProductVariantId: number, Quantity: number, Price: number) {
    try {
        const response = await fetch(`${API_Order}/addOrderItem`, {
            method: 'POST',
            body: JSON.stringify({ OrderId, ProductVariantId, Quantity, Price }),
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

export async function getOrderById(OrderId: number | null ) {
    try {
        const response = await fetch(`${API_Order}/getOrderById`, {
            method: 'POST',
            body: JSON.stringify({ OrderId }),
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


