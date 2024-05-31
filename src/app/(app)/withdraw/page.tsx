"use client"
import BankDetailsForm from '../BankDetailForm/page'
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [name, setName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [ifscCode, setIfscCode] = useState<string>('');
  const [bankDetailsFetched, setBankDetailsFetched] = useState<boolean>(false);
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get('/api/get-BankDetails');
      if (response.data.success) {
        const bankDetails = response.data.bankDetails;
        setName(bankDetails.name);
        setAccountNumber(bankDetails.accountNumber);
        setIfscCode(bankDetails.ifscCode);
        setBankDetailsFetched(true);
        setOpenDialog(true);
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
    setOpenDialog(false);
    toast({
      title: 'Success',
      description: 'Bank details submitted successfully.',
    });
        router.replace('/withdraw/amount')
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setBankDetailsFetched(false);
  };

  return (
    <div>
      {bankDetailsFetched ? (
        <div className="my-8 text-xl mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogTrigger asChild>
              <div className="hidden" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Bank Details</AlertDialogTitle>
                <AlertDialogDescription>
                    These details are fetched from your previous form submission
                  <div className="my-8 text-xl mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Account Number:</strong> {accountNumber}</p>
                    <p><strong>IFSC Code:</strong> {ifscCode}</p>
                  </div>
                  Please confirm your bank details. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <BankDetailsForm name={name} accountNumber={accountNumber} ifscCode={ifscCode} isUpdate={!!name && !!accountNumber && !!ifscCode} />
      )}
    </div>
  );
};

export default Page;
