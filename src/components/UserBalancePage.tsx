import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const UserBalancePage: React.FC = () => {
    const { data: session } = useSession();
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const withdrawalTransactions = transactions.filter(transaction => transaction.type === 'deposit');
    const hasWithdrawals = withdrawalTransactions.length > 0;

    useEffect(() => {
        if (session) {
            const fetchBalanceAndTransactions = async () => {
                try {
                    const response = await axios.get('/api/get-BalanceAndTransactions');
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
        <h3>No Withdrawals</h3>
      ) : (
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h2 className="">Transaction History</h2>
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {withdrawalTransactions.map(transaction => (
                    <li key={transaction._id} className='text-sm md:underline'>
                      {new Date(transaction.date).toLocaleString()}: {transaction.type} of {transaction.amount} (Balance after: {transaction.balanceAfter})
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
