// src/app/api/razorpay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import shortid from 'shortid';
import Razorpay from 'razorpay';

interface RazorpayOrderOptions {
  amount: string;
  currency: string;
  receipt: string;
  payment_capture: number;
}

export async function POST(req: NextRequest) {
  const { taxAmt } = await req.json();
 // console.log('RAZORPAY_KEY:', process.env.RAZORPAY_KEY);
 // console.log('RAZORPAY_SECRET:', process.env.RAZORPAY_SECRET);
  
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY!,
    key_secret: process.env.RAZORPAY_SECRET!,
    
  });

  const payment_capture = 1;
  const amount = taxAmt;
  const currency = 'INR';
  const options: RazorpayOrderOptions = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 400 });
  }
}

// Allow only POST requests
export const config = {
  api: {
    bodyParser: false,
  },
};
