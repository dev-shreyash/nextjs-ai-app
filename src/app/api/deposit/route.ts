import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnector';
import UserModel from '@/model/user.model';
import TransactionModel from '@/model/transaction.model';

export async function POST(req: Request) {
  await dbConnect();
  const { amount,username } = await req.json();


  // Find user by username
  const user = await UserModel.findOne({ username }).exec();

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }


  if (amount <= 0) {
    return NextResponse.json({ success: false, message: 'Amount must be greater than zero' }, { status: 400 });
  }

  try {
    user.balance += amount;
    await user.save();

    const transaction = new TransactionModel({
      user: user._id,
      type: 'deposit',
      amount,
      balanceAfter: user.balance,
    });
    await transaction.save();
    console.log("Transaction success");

    return new Response(JSON.stringify({ success: true, message: 'Deposit successful', balance: user.balance }), { status: 200 });
  } catch (error) {
    console.error('Error during deposit:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
