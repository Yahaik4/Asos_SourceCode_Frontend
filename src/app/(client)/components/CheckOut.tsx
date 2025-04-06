"use Client"
import { POST } from "@/Services/paymentService";
import React, { useEffect, useState } from "react";

import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "../../../../lib/convertToSubcurrency";

const CheckOut = ({amount} : {amount: number}) => {
    const stripe = useStripe();
    const element = useElements();

    const [ errorMessage, setErrorMessage ] = useState<string>();
    const [ clinetSecret, setClinetSecret ] = useState("");
    const [ loading, setLoading ] = useState(false);

    // useEffect(() => {
    //     fetch("/")
    // }, [amount])


    return(
        <form action="">
            {clinetSecret && <PaymentElement />}
            {errorMessage && <div>{errorMessage}</div>}
            <button>Pay</button>
        </form>
    )
}

export default CheckOut;