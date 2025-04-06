const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_Category = `${API_DOMAIN}/categories`;

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
