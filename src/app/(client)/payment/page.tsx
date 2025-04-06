"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "../components/CheckOut";

import convertToSubcurrency from "../../../../lib/convertToSubcurrency";

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const PaymentPage: React.FC = () => {
    const amount = 49.99;

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
                <h2 className="text-2xl">
                    has requested    
                    <span className="font-bold"> ${amount}</span>
                </h2>

                <CheckOut amount={amount}></CheckOut>
            </div>

            <Elements stripe={stripePromise} options={{
                mode: "payment",
                amount: convertToSubcurrency(amount), //cents
                currency: "usd",
            }}>
            
            </Elements>
        </main>    
    )
}

export default PaymentPage