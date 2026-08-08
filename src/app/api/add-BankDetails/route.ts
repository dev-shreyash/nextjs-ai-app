import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { dbConnect } from '@/lib/dbConnector';
import UserModel, { BankDetailsModel } from '@/model/user.model';
import { BankDetailsSchema } from '@/schemas/BankDetailsSchema';
import mongoose from 'mongoose';
import { User } from 'next-auth';

export async function POST(req: Request) {
  await dbConnect();

  const session = await auth();
  console.log(session);
  
  if (!session || !session.user) {
    return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
  }

  const userId = session.user._id;
  const { name, accountNumber, ifscCode } = await req.json();

  // Validate the input
  const validation = BankDetailsSchema.safeParse({ name, accountNumber, ifscCode });

  if (!validation.success) {
    return NextResponse.json({ success: false, message: 'Invalid input', errors: validation.error.errors }, { status: 400 });
  }

  try {
    // Fetch the user from the database
    const userDocument = await UserModel.findById(userId).exec();
    console.log(userDocument);
    if (!userDocument) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Create a new bank details entry
    const newBankDetails = new BankDetailsModel({
      name,
      accountNumber,
      ifscCode,
      user: userDocument._id 
    });
   // console.log(newBankDetails)

    // Save the bank details to the database
    await newBankDetails.save();

    // Associate the bank details with the user
    userDocument.bankDetails = newBankDetails._id;
    await userDocument.save();

    return new Response(JSON.stringify({ success: true, message: 'Bank details added successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error during POST request:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong while creating bank details' }, { status: 500 });
  }
}
