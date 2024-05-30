// src/app/api/get-BankDetails/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnector';
import UserModel, { BankDetailsModel } from '@/model/user.model';
import { User } from 'next-auth';

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  const userId = session.user._id;

  try {
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const bankDetails = await BankDetailsModel.findById(user.bankDetails).exec();

    console.log("User details:", user);
    console.log("Bank details:", bankDetails);

    return NextResponse.json({ success: true, bankDetails }, { status: 200 });
  } catch (error) {
    console.error('Error during GET request:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong while fetching bank details' }, { status: 500 });
  }
}
