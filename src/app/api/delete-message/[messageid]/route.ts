import UserModel from '@/model/user.model';
import { auth } from "@/auth";
import { dbConnect } from '@/lib/dbConnector';
import { User } from 'next-auth';
import { NextRequest } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ messageid: string }> } 
) {
  // 1. Explicitly await the asynchronous route params
  const { messageid } = await params; 
  
  await dbConnect();

  // 2. Fetch the session using the Next-Auth v5 auth() wrapper
  const session = await auth();
  const _user: User | undefined = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    // 3. Updated query to use 'messageid' matching the variable above
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageid } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: 'Message not found or already deleted', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { 
        message: 'Message deleted',
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}
