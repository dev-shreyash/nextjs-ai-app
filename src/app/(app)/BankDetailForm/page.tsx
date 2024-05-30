// BankDetailsForm.tsx

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { BankDetailsSchema, BankDetailsFormData } from '../../../schemas/BankDetailsSchema'; // Import BankDetailsSchema
import { ApiResponse } from '@/types/ApiResponse';

const BankDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState<BankDetailsFormData | null>(null);
  const form = useForm<BankDetailsFormData>({
    resolver: zodResolver(BankDetailsSchema),
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<BankDetailsFormData> = async (data) => {
    try {
      const response = await axios.post('/api/add-BankDetails', data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Something went wrong');
      }

      console.log('Form data submitted:', response.data);

      setFormData(data);

      toast({
        title: 'Success',
        description: 'Bank details submitted successfully.',
      });

      form.reset();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error during submitting bank details:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your setting bank details. Please try again.');

      toast({
        title: 'Error during submitting bank details',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
     <div className="my-8 text-xl mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Enter Your Bank Details</h1>
   
      <Form {...form}>
        <FormField  name="name" control={form.control} render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className='text-xl font-bold'>Name</FormLabel>
            <Input {...field} placeholder="Enter your name" />
            <FormDescription className='text-xs p-0 m-0'>Enter name as per bank details.</FormDescription>


            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          </FormItem>
        )} />

        <FormField name="accountNumber" control={form.control} render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className='text-xl font-bold'>Account Number</FormLabel>
            <Input {...field} placeholder="Enter your account number" />
            <FormDescription className='text-xs p-0 m-0'>Enter a 9-18 digit bank account number only</FormDescription>
            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          </FormItem>
        )} />

        <FormField name="ifscCode" control={form.control} render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className='text-xl font-bold'>IFSC Code</FormLabel>
            <Input {...field} placeholder="Enter your IFSC code" />
            <FormDescription className='text-xs p-0 m-0'>Enter an 11-digit alphanumeric IFSC code only.</FormDescription>
            {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          </FormItem>
        )} />

        <Button className='my-8' type="submit" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
      </Form>

      {formData && (
        <div>
          <h2>Form Data Saved:</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
      </div>
    </>
  );
};

export default BankDetailsForm;
