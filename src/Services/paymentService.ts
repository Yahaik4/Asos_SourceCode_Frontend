const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN; 
const API_Payment = `${API_DOMAIN}/payment`;

export async function CreatePaymentIntent(amount: number, method: string | null, orderId: number | null) {
    try {
        const response = await fetch(`${API_Payment}/create-payment-intent`, {
            method: 'POST',
            body: JSON.stringify({ amount, method, orderId }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'create-payment-intent Failed');
        }

        return resData;
    } catch (error: any) {
        console.error("CreatePaymentIntent error:", error);
        throw error;
    }
}

export async function ConfirmPayment(orderId: number, paymentProvider: string, paymentIntentId: string, transactionId: string, paymentMethod: string, amount: number) {
    try {
        const response = await fetch(`${API_Payment}/confirm-payment`, {
            method: 'POST',
            body: JSON.stringify({ orderId, paymentProvider, paymentIntentId, transactionId, paymentMethod, amount }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        const resData = await response.json();

        if (!response.ok) { 
            throw new Error(resData.msg || 'ConfirmPayment Failed');
        }

        return resData.metadata;
    } catch (error: any) {
        console.error("Login error:", error);
        throw error;
    }
}
