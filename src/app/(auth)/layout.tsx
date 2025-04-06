'use client';
import React, { ReactNode } from 'react';
import EmailVerificationContextProvider from './EmailVerificationContext';

interface AuthLayoutProps {
    children: ReactNode;
}

const layout = ({ children }: AuthLayoutProps) => {
    return <EmailVerificationContextProvider>{children}</EmailVerificationContextProvider>;
};

export default layout;