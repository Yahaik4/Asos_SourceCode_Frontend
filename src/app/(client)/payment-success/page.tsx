"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ConfirmPayment } from "@/Services/paymentService";

const PaymentSuccessPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const paymentIntent = searchParams.get("payment_intent");
    const orderIdStr = searchParams.get("orderId");
    const orderId = orderIdStr ? parseInt(orderIdStr) : null;
    const paymentMethod = searchParams.get("payment_method");
    const amountStr = localStorage.getItem("payment_amount");
    const amount = amountStr ? parseFloat(amountStr) : null;

    console.log(orderId);
    console.log(paymentMethod)

    useEffect(() => {
        const confirmPayment = async () => {
            if (!orderId || !paymentMethod) {
                console.error("Missing paymentIntent or orderId");
                router.push("/my-account/orders");
                return;
            }

            try {
                if (paymentMethod === "momo") {
                    const fakePaymentIntentId = "fake_payment_intent_id";
                    const fakeTransactionId = "fake_transaction_id";

                    const metadata = await ConfirmPayment(
                        orderId,
                        "Momo",
                        fakePaymentIntentId, // ID giả
                        fakeTransactionId, // ID giao dịch giả
                        "Wallet", // Hoặc phương thức thanh toán của Momo
                        amount || 0
                    );

                    console.log("Payment confirmed for Momo, metadata:", metadata);
                } else if (paymentMethod === "stripe" && paymentIntent) {
                    const metadata = await ConfirmPayment(
                        orderId,
                        "Stripe",
                        paymentIntent,
                        paymentIntent,
                        "card",
                        amount || 0
                    );

                    console.log("Payment confirmed for Stripe, metadata:", metadata);
                }

                router.push("/my-account/orders");
            } catch (error) {
                console.error("Error confirming payment:", error);
                router.push("/my-account/orders?error=payment_error");
            }
        };

        confirmPayment();
    }, [paymentIntent, orderId, paymentMethod, router]);

    return (
        <div className="text-center p-10">
            <h1 className="text-2xl font-bold mb-4">Verifying your payment...</h1>
            <p>Please wait while we process your order.</p>
        </div>
    );
};

export default PaymentSuccessPage;
