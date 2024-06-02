'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import messages from '@/messages.json';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Link from 'next/link';

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className='flex flex-col h-full flex-grow'>
      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-200 text-black">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Honest, Anonymous Funding When You Need It Most
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Fund your Homie - Empowering Conversations, One Anonymous Tip at a Time.
          </p>
        </section>
        {/* Carousel for Messages */}
        {isClient ? (
          <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-full max-w-lg md:max-w-xl"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                      <Mail className="flex-shrink-0" />
                      <div>
                        <p>{message.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="w-full max-w-lg md:max-w-xl">
            Loading...
          </div>
        )}
          <div className="text-center">
            <p className="text-lg mb-8">A crowdfunding platform to support your dreams and causes</p>
            <Link href="/about">
              <p className="text-lg font-medium hover:underline underline-offset-4">Learn More</p>
            </Link>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <p className="text-lg mb-4">Fund Your Homie makes it easy for individuals to raise funds for various purposes, including personal needs, projects, and charitable causes.</p>
            <p className="text-lg mb-4">To get started, simply create a free account and set up your fundraising campaign. Share your campaign link with your network and start receiving donations.</p>
            <p className="text-lg">Donors have the flexibility to contribute anonymously and leave messages of support for your cause.</p>
          </div>
        
        
      </div>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © {year} Shreyash. All rights reserved.
      </footer>
    </div>
  );
}

export default Page;
