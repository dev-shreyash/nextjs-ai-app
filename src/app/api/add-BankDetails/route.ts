import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnector';
import UserModel, { BankDetailsModel } from '@/model/user.model';

export async function GET(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
  }

  const userId = session.user._id;

  try {
    // Fetch the user from the database along with their bank details
    const userDocument = await UserModel.findById(userId)
      .populate('bankDetails')
      .exec();
    
    if (!userDocument) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const bankDetails = userDocument.bankDetails;

    if (!bankDetails) {
      return NextResponse.json({ success: false, message: 'No bank details found for this user' }, { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, bankDetails }), { status: 200 });
  } catch (error) {
    console.error('Error during GET request:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong while fetching bank details' }, { status: 500 });
  }
}
