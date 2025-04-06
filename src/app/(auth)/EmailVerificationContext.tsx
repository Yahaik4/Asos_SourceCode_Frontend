'use client';
import { useRouter } from 'next/navigation';
import React, { ComponentType, createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type EmailVerificationProps = {
    emailVerification: string | null;
    setEmail: (email: string) => void;
};

export const EmailVerificationContext = createContext<EmailVerificationProps>({
    emailVerification: null,
    setEmail: (email) => {},
});

export const useEmailVerificationContext = () => {
    const context = useContext(EmailVerificationContext);
    if (!context) {
        throw new Error('useEmailVerificationContext must be used in EmailVerificationContext Provider');
    }
    return context;
};

export const withEmailVerification = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const Wrapper: React.FC<P & EmailVerificationProps> = (props: any) => {
        const { emailVerification } = useEmailVerificationContext();
        const router = useRouter();

        useEffect(() => {
            if (!emailVerification) {
                router.back(); // Redirect to login if not authenticated
            }
        }, [emailVerification, router]);

        return emailVerification ? <WrappedComponent {...props} /> : null; // Render wrapped component if authenticated
    };

    return Wrapper;
};

const EmailVerificationContextProvider = ({ children }: { children: ReactNode }) => {
    const [emailVerification, setEmailVerification] = useState<string | null>(null);

    const setEmail = (email: string) => {
        setEmailVerification(email);
    };

    return (
        <EmailVerificationContext.Provider value={{ emailVerification, setEmail }}>
            {children}
        </EmailVerificationContext.Provider>
    );
};

export default EmailVerificationContextProvider;