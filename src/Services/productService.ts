const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_Product = `${API_DOMAIN}/product`;

export async function getAllProduct() {
    try {
        const response = await fetch(API_Product);
        const resData = await response.json();

        console.log("Response Status:", response.status);
        console.log("Response Data:", resData);

        if (!response.ok) { 
            throw new Error(resData.msg || 'Failed to fetch products');
        }

        return resData.metadata;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw error;
    }
}

interface FilterOp<T> {
    key: keyof T;
    value: T[keyof T] | null
}

export async function fetchFilteredProducts<T>(filter: FilterOp<T>[]){
    try {
        const url = new URL(`${API_Product}/filter`);
        filter.forEach(filter => {
            if(filter.value){
                url.searchParams.append(String(filter.key), String(filter.value));
            }
        })
        const response = await fetch(url.toString());
        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'Failed to fetch products');
        }

        return resData.metadata;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw error;
    }
}

