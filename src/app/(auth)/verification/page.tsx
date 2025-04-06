'use client';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TbLoader2, TbReload, TbEdit } from 'react-icons/tb';
import { formatTime } from '../utils/formatTime';
import { useEmailVerificationContext, withEmailVerification } from '../EmailVerificationContext';
import Link from 'next/link';
import Overlay from '../components/Overlay';
import { VevifyOTP } from '@/Services/authService';
import { match } from 'assert';

const VerficationFormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
});

const page = () => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [resend, setResend] = useState(false);
    const [countDown, setCountDown] = useState(300);
    const { emailVerification } = useEmailVerificationContext();
    const form = useForm<z.infer<typeof VerficationFormSchema>>({
        resolver: zodResolver(VerficationFormSchema),
        defaultValues: {
            pin: '',
        },
    });

    useEffect(() => {
        let interval: any = null;
        if (resend && countDown > 0) {
            interval = setInterval(() => {
                setCountDown((prev) => (prev -= 1));
            }, 1000);
        } else if (countDown === 0) {
            clearInterval(interval);
            setResend(false);
            setCountDown(300);
        }
        return () => clearInterval(interval);
    }, [resend, countDown]);

    const onSubmit = async (data: z.infer<typeof VerficationFormSchema>) => {
        try{
            const verifyOTP = await VevifyOTP( emailVerification, data.pin );
            console.log(data.pin);
            console.log(emailVerification);
            
            if(verifyOTP){
                toast.success(verifyOTP.msg, {
                    autoClose: 2000,
                    onClose: () => {
                        setIsPending(false);
                        router.push('/women');
                    },
                });
            }
        }catch(error: any){
            toast.error(error?.message, {
                autoClose: 2000,
                onClose: () => {
                    setIsPending(false);
                },
            });
            throw error;
        }
    };

    useEffect(() => {
        if (!emailVerification) {
            router.back();
        }
    }, []);

    return (
        <div className="w-full flex flex-col min-h-screen justify-center items-center">
            <ToastContainer/>
            <div className="flex flex-col gap-4 w-[400px] relative overflow-hidden">
                <Overlay
                    classname={`absolute !bg-white !bg-opacity-90 max-w-full max-h-full items-center justify-center flex ${
                        isPending ? 'flex' : 'hidden'
                    }`}
                >
                    <TbLoader2 className="text-[50px] text-blue-500 animate-spin" />
                </Overlay>
                <Card className="mx-auto w-full max-w-md ">
                    <CardHeader className="items-center">
                        <CardTitle className="text-xl">Verification Code</CardTitle>
                        <CardDescription> Please enter the one-time password sent to your email.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4 flex-col">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col justify-center items-center">
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup className="gap-2">
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription className="flex flex-col items-center">
                                                The OTP is sent to:{' '}
                                                <span className="flex gap-2 items-center">
                                                    <span className="font-bold">{emailVerification}</span>
                                                    <TbEdit
                                                        className="cursor-pointer"
                                                        onClick={() => router.push('/reset-password')}
                                                    />
                                                </span>
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div
                                    onClick={() => setResend(true)}
                                    className={`${
                                        !resend ? 'flex' : 'hidden'
                                    } group justify-center items-center gap-1 text-sm underline cursor-pointer`}
                                >
                                    <TbReload className="transition transform group-hover:rotate-[360deg] duration-500" />
                                    <p>Resend OTP</p>
                                </div>
                                <div
                                    className={`${
                                        resend ? 'flex' : 'hidden'
                                    } justify-center items-center gap-2 text-sm`}
                                >
                                    <p>
                                        Resend Verification Code in: <span>{formatTime(countDown)}</span>
                                    </p>
                                </div>
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <div className="mx-auto flex gap-1 text-sm">
                    <p>Already had an account ?</p>
                    <Link href="/login" className="underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default withEmailVerification(page);