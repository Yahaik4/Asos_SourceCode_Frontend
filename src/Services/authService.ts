const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_Auth = `${API_DOMAIN}/auth`;

export async function Login(email: string, password: string) {
    try {
        const response = await fetch(`${API_Auth}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'Login Failed');
        }

        return resData;
    } catch (error: any) {
        console.error("Login error:", error);
        throw error;
    }
}

export default { Login }