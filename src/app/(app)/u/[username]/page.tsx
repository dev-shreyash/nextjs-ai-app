"use client"
import React from 'react'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { messageSchema } from '@/schemas/messageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
//import { toast } from '@/components/ui/use-toast';
import { useToast } from '@/components/ui/use-toast';

import axios, { AxiosError } from 'axios';


const Page = () => {

  const [ content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  function getUsernameFromCurrentUrl() {
    const regex = /\/u\/([^\/]+)/;
    const baseUrl = `${window.location.pathname}`;
    const match = baseUrl.match(regex);
    return match ? match[1] : null;
  }
  const username = getUsernameFromCurrentUrl()


  const messageSchema = z.object({
    content: z.string(),
  });
  
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content:''
    },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    console.log("content:", data.content);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', { content: data.content, username });
  
      toast({
        title: 'Success',
        description: response.data.message,
      });
      setIsSubmitting(false);
      form.reset(); // Reset the form after successful submission
  
    } catch (error) {
      console.error('Error during message sending:', error);
  
      const axiosError = error as AxiosError<ApiResponse>;
  
      // Default error message
      let errorMessage = 'There was a problem with your sending message. Please try again.';
  
      // If the response has a message, use it instead
      if (axiosError.response?.data.message) {
        errorMessage = axiosError.response.data.message;
      }
  
      toast({
        title: 'Message Not Sent',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };
  

 


  return (

    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Advice your homie</h1>
      <div>Send Anonymous Message to @{username}</div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" mx-auto mt-10 p-4 border border-gray-300 rounded-lg">
        <FormItem className="mb-4">
          <FormLabel htmlFor="input" className="block text-gray-700 mb-2">Enter something:</FormLabel>
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormItem>
            )}
          />
          {errorMessage && <FormMessage className="text-red-500 mt-2">{errorMessage}</FormMessage>}
        </FormItem>
        <Button type="submit" className='flex justify-end ' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Send Message'
              )}
            </Button>
        </form>
      </Form>
    </div>

  )
}

export default Page
