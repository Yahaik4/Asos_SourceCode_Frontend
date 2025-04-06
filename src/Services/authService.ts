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

export async function SendMail(email: string) {
    try{
        const response = await fetch(`${API_Auth}/resetpassword`, {
            method: 'POST',
            body: JSON.stringify({ email }),
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
    }catch(error){
        console.error(error);
        throw error;
    }
}

export async function VevifyOTP(email: string | null, OTP: string ) {
    try{
        const response = await fetch(`${API_Auth}/verifyotp`, {
            method: 'POST',
            body: JSON.stringify({ email, OTP }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'verifyotp Failed');
        }

        return resData;
    }catch(error){
        console.error(error);
        throw error;
    }
}


