"use client"
import BankDetailsForm from '../BankDetailForm/page'
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { BankDetailsSchema, BankDetailsFormData } from '../../../schemas/BankDetailsSchema'; // Import BankDetailsSchema
import { ApiResponse } from '@/types/ApiResponse';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';



const Page = () => {
 const [name, setName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [ifscCode, setIfscCode] = useState<string>('');
  const [bankDetailsFetched, setBankDetailsFetched] = useState<boolean>(false);
  const { toast } = useToast();


  //fetch bank details
  const fetchBankDetails = async () => {
    try {
      const response = await axios.get('/api/get-BankDetails');
      if (response.data.success) {
        const bankDetails = response.data.bankDetails;
        setName(bankDetails.name);
        setAccountNumber(bankDetails.accountNumber);
        setIfscCode(bankDetails.ifscCode);
        setBankDetailsFetched(true);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching bank details:', error);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);



  const handleConfirm = () => {
    toast({
      title: 'Confirmed',
      description: 'Bank details confirmed successfully.',
    });
  };

  const handleCancel = () => {
    setBankDetailsFetched(false);
    setName('');
    setAccountNumber('');
    setIfscCode('');
    toast({
      title: 'Cancelled',
      description: 'Bank details editing cancelled.',
    });
  };

  return (
    <div>
    {bankDetailsFetched ? (
         <div className="my-8 text-xl mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Account Number:</strong> {accountNumber}</p>
          <p><strong>IFSC Code:</strong> {ifscCode}</p>
          <div className="mt-4">
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button variant="destructive" onClick={handleCancel} className="ml-4">Cancel</Button>
          </div>
        </div>
      ) : (
      <BankDetailsForm/>
    )}
    </div>
  )
}

export default Page
