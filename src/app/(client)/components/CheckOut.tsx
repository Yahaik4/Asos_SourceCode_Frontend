"use client";
import React, { useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";

const CheckOut = ({ amount, orderId, paymentIntentId, method }: { amount: number; orderId: number, paymentIntentId: string, method: string  }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not ready");
            setLoading(false);
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?orderId=${orderId}&payment_intent=${paymentIntentId}&payment_method=${method}`,
            },
        });

        if (result.error) {
            setErrorMessage(result.error.message || "Payment failed");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
                disabled={!stripe || loading}
            >
                {loading ? "Processing..." : `Pay $${amount}`}
            </button>
        </form>
    );
};

export default CheckOut;
