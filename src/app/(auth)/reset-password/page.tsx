'use client';
import React, { ChangeEvent, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { TbLoader2 } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Overlay from '../components/Overlay';
import Link from 'next/link';
import { useEmailVerificationContext } from '../EmailVerificationContext';
import { useRouter } from 'next/navigation';
import { SendMail } from '@/Services/authService';

const ResetPasswordFormSchema = z.object({
    email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
});

const page = () => {
    const router = useRouter();
    const { setEmail } = useEmailVerificationContext();
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof ResetPasswordFormSchema>) => {
        // handleOnReset.mutate(values.email);
        setEmail(values.email);
        setIsPending(true);

        try{
            const sendMail = await SendMail(values.email);
            console.log(sendMail);
            if(sendMail){
                toast.success(sendMail.msg, {
                    autoClose: 2000,
                    onClose: () => {
                        setIsPending(false);
                        router.push('/verification');
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
    return (
        <div className="w-full flex flex-col min-h-screen justify-center items-center">
            <ToastContainer/>
            <div className="flex flex-col gap-4 w-[400px] relative">
                <Overlay
                    classname={`absolute !bg-white !bg-opacity-90 max-w-full max-h-full items-center justify-center ${
                        isPending ? 'flex' : 'hidden'
                    }`}
                >
                    <TbLoader2 className="text-[50px] text-blue-500 animate-spin" />
                </Overlay>
                <Card className="mx-auto w-full max-w-md">
                    <CardHeader className="items-center">
                        <CardTitle className="text-xl">Reset your Password</CardTitle>
                        <CardDescription>We will send the OTP to your Email account</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4 flex-col">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <div className="flex flex-col gap-2">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className={
                                                            fieldState.invalid
                                                                ? `bg-red-200 border-red-500 outline-none focus-visible:ring-0`
                                                                : ''
                                                        }
                                                        placeholder="m@example.com"
                                                        {...field}
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                            field.onChange(e);
                                                            form.clearErrors('email');
                                                        }}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Send OTP
                                </Button>
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

export default page;