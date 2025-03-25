"use client";
import EmailForm from "../components/EmailForm";
import { TbCircleLetterA } from "react-icons/tb";
import PasswordForm from "../components/PasswordForm";
import { useState } from "react";


const page: React.FC = () => {

    const [email, setEmail] = useState("");
    const [showEmailForm, setShowEmailForm] = useState(true);

    return (
        <div className="w-full flex items-center justify-center h-screen">
            <div className="flex flex-col items-center max-w-[400px] h-full justify-center">
                <TbCircleLetterA size={100}/>
                <div className="mb-6 w-full font-bold text-2xl">
                    Hi friend!
                </div>

                {showEmailForm ? (
                    <EmailForm defaultEmail="" onSubmit={(email) => { setEmail(email); setShowEmailForm(false); }} />
                ) : (
                    <PasswordForm email={email} onEdit={() => setShowEmailForm(true)} />
                )}
            </div>
        </div>
    )
}

export default page