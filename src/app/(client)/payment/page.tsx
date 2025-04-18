"use client"
import { useSearchParams } from "next/navigation";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "../components/CheckOut";
import { useEffect, useState } from "react";
import { CreatePaymentIntent } from "@/Services/paymentService";
import { getOrderById } from "@/Services/orderService";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentPage: React.FC = () => {
    const searchParam = useSearchParams();
    const orderIdStr = searchParam.get("orderId");
    const orderId = orderIdStr !== null ? parseInt(orderIdStr) : null;
    const method = searchParam.get("payment_method");
    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState("");
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [amount, setAmount] = useState<number>();
    
    useEffect(() => {
        const getOrder = async () => {
            if (orderId === null || isNaN(orderId)) {
                console.error("Invalid orderId");
                return;
            }else{
                const order = await getOrderById(orderId);
                console.log("order:", order);
                setAmount(order.totalPrice);
                localStorage.setItem("payment_amount", JSON.stringify(order.totalPrice));
            }
        };
        getOrder();
    }, [orderId]);

    useEffect(() => {
        const fetchClientSecret = async () => {
            if(amount != null){
                const res = await CreatePaymentIntent(amount, method, orderId);
                console.log("res:", res);
                setClientSecret(res.clientSecret); 
                setPaymentIntentId(res.paymentIntentId);
            }
        };
        fetchClientSecret();
    }, [amount]);

    console.log("Client Secret:", clientSecret);
    console.log("paymentIntentId:", paymentIntentId);
    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
        },
    };

    const handlePayClick = () => {
        if (clientSecret) {
            setShowPaymentForm(true);
        }
    };

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
                <h2 className="text-2xl">
                    has requested <span className="font-bold"> ${amount}</span>
                </h2>
            </div>

            {!showPaymentForm && (
                <button
                    onClick={handlePayClick}
                    className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
                    disabled={!clientSecret}
                >
                    Pay ${amount}
                </button>
            )}

            {showPaymentForm && stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckOut amount={amount || 0} orderId={orderId} paymentIntentId={paymentIntentId} method={method}/>
                </Elements>
            )}
        </main>
    );
};

export default PaymentPage;
