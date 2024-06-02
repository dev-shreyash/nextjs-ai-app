'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import WithdrawalPolicy from '@/components/withdrawalPolicy';

const Page: React.FC = () => {
    const form = useForm();
    const [inputAmount, setInputAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const { data: session } = useSession();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (session) {
            const fetchBalanceAndTransactions = async () => {
                try {
                    const response = await axios.get('/api/get-BalanceAndTransactions');
                    if (response.data.success) {
                        setBalance(response.data.balance);
                    }
                } catch (error) {
                    console.error('Error fetching balance and transactions:', error);
                }
            };

            fetchBalanceAndTransactions();
        }
    }, [session]);

    const onSubmit = () => {
        // Submission logic here
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setInputAmount(value);

        if (value > balance) {
            setErrorMessage('Amount should not be greater than your current balance');
        } else {
            setErrorMessage('');
        }
    };

    return (
        <div className='flex flex-col h-full flex-grow'>
            <div className="flex-grow flex flex-col items-center justify-center px-0 md:px-0 bg-white py-0 text-black">
                <div className="my-0 mx-4 md:mx-8 lg:mx-auto h-full p-6 bg-gray-200 rounded w-full max-w-6xl">
                    <Form {...form}>
                        <FormDescription className='text-xs p-0 m-0'>Your Balance: {balance}</FormDescription>
                        <FormField
                            name="amount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-xl font-bold'>Amount</FormLabel>
                                    <Input
                                        type='number'
                                        {...field}
                                        placeholder="Enter amount to withdraw"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleInputChange(e);
                                        }}
                                    />
                                    {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
                                    <FormDescription className='text-xs p-0 m-0'>
                                        <WithdrawalPolicy />
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <Button
                            className='my-8'
                            type="submit"
                            onClick={form.handleSubmit(onSubmit)}
                            disabled
                        >
                            Confirm
                        </Button>
                        <FormDescription className='text-s p-0 m-0 text-red-600'>
                            *Withdrawal is not supported currently
                        </FormDescription>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Page;
