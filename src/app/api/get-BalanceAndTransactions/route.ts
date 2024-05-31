import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnector';
import UserModel from '@/model/user.model';
import TransactionModel from '@/model/transaction.model';

export async function GET(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
  }

  const userId = session.user._id;

  try {
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const transactions = await TransactionModel.find({ user: userId }).sort({ date: -1 }).exec();

    return new Response(JSON.stringify({ success: true, balance: user.balance, transactions }), { status: 200 });
  } catch (error) {
    console.error('Error fetching balance and transactions:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
