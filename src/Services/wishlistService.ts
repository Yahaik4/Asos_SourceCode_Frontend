const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_Wishlist = `${API_DOMAIN}/wishlist`;

export async function fetchAllWishListItem() {
    try {
        const response = await fetch(API_Wishlist, {
            method: "GET",
            credentials: "include",
        });
        
        const resData = await response.json();

        console.log("Response Status:", response.status);
        console.log("Response Data:", resData);

        if (!response.ok) { 
            throw new Error(resData.msg || 'Failed to fetch WishListItem');
        }

        return resData.metadata;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw error;
    }
}