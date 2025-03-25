const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_ProductGroup = `${API_DOMAIN}/ProductGroup`;

export async function fetchAllProductGroup() {
    try {
        const response = await fetch(API_ProductGroup);
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