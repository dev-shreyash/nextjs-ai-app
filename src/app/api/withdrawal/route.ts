import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnector';
import UserModel from '@/model/user.model';
import TransactionModel from '@/model/transaction.model';

export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
  }

  const userId = session.user._id;
  const { amount } = await req.json();

  if (amount <= 0) {
    return NextResponse.json({ success: false, message: 'Amount must be greater than zero' }, { status: 400 });
  }

  try {
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (user.balance < amount) {
      return NextResponse.json({ success: false, message: 'Insufficient balance' }, { status: 400 });
    }

    user.balance -= amount;
    await user.save();

    const transaction = new TransactionModel({
      user: user._id,
      type: 'withdrawal',
      amount,
      balanceAfter: user.balance,
    });
    await transaction.save();

    return new Response(JSON.stringify({ success: true, message: 'Withdrawal successful', balance: user.balance }), { status: 200 });
  } catch (error) {
    console.error('Error during withdrawal:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}
