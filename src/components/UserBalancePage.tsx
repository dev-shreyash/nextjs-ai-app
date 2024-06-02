import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Transaction {
    _id: string;
    type: 'deposit' | 'withdrawal';
    amount: number;
    date: string; // Change the date type to string or use Date object if applicable
    balanceAfter: number;
}

const UserBalancePage: React.FC = () => {
    const { data: session } = useSession();
    const [balance, setBalance] = useState<number>(0); // Explicitly set balance as number
    const [transactions, setTransactions] = useState<Transaction[]>([]); // Set the type for transactions
    const withdrawalTransactions = transactions.filter(transaction => transaction.type === 'withdrawal');
    const hasWithdrawals = withdrawalTransactions.length > 0;

    useEffect(() => {
        if (session) {
            const fetchBalanceAndTransactions = async () => {
                try {
                    const response = await axios.get<{ success: boolean; balance: number; transactions: Transaction[] }>('/api/get-BalanceAndTransactions');
                    if (response.data.success) {
                        setBalance(response.data.balance);
                        setTransactions(response.data.transactions);
                    }
                } catch (error) {
                    console.error('Error fetching balance and transactions:', error);
                }
            };

            fetchBalanceAndTransactions();
        }
    }, [session]);

    return (
        <div>
            <h1>Your Balance: {balance}</h1>
            {!hasWithdrawals ? (
                 <Accordion type="single" collapsible>
                 <AccordionItem value="item-1">
                     <AccordionTrigger>
                         <h2 className="">Withdrawal History</h2>
                     </AccordionTrigger>
                     <AccordionContent>
                        <h3>No withdrawal history</h3>
                     </AccordionContent>
                 </AccordionItem>
             </Accordion>
            ) : (
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <h2 className="">Withdrawal History</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul>
                                    {withdrawalTransactions.map(transaction => (
                                        <li key={transaction._id} className='text-sm md:underline'>
                                            ({new Date(transaction.date).toLocaleString()}): {transaction.type} of {transaction.amount} (Balance after: {transaction.balanceAfter})
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
        </div>
    );
};

export default UserBalancePage;
