import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnector';
import UserModel, { BankDetailsModel } from '@/model/user.model';
import { BankDetailsSchema } from '@/schemas/BankDetailsSchema';

export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
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
    // Fetch the user from the database along with their bank details
    const userDocument = await UserModel.findById(userId).populate('bankDetails').exec();
    console.log(userDocument);

    if (!userDocument) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const bankDetails = userDocument.bankDetails;

    if (!bankDetails) {
      return NextResponse.json({ success: false, message: 'No bank details found for this user' }, { status: 404 });
    }

    // Update the existing bank details
    bankDetails.name = name;
    bankDetails.accountNumber = accountNumber;
    bankDetails.ifscCode = ifscCode;

    // Save the updated bank details
    await bankDetails.save();

    return new Response(JSON.stringify({ success: true, message: 'Bank details updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error during POST request:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong while updating bank details' }, { status: 500 });
  }
}
