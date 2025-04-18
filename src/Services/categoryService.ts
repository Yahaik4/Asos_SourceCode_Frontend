const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_Category = `${API_DOMAIN}/categories`;


export async function fetchAllCategory() {
    try {
        const response = await fetch(API_Category);
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

export async function GetCategoryById(id: number) {
    try {
        const response = await fetch(`${API_Category}/${id}`);
        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'Fetch Failed');
        }

        return resData.metadata;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw error;
    }
}
