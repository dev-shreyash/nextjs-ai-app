import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnector';
import UserModel from '@/model/user.model';
import { User } from 'next-auth';
import mongoose from 'mongoose';

export async function GET(request: Request) {
    // Connect to the database
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !session.user) {
        return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        // Find the user document
        const userDoc = await UserModel.findOne({ _id: userId }).lean();

        if (!userDoc) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
        }

        // Log the user document for debugging
        console.log("User Document:", userDoc);

        // Check if the messages field exists and is an array
        if (!Array.isArray(userDoc.messages)) {
            return new Response(JSON.stringify({ success: false, message: 'No messages found' }), { status: 404 });
        }

        // Sort the messages array by createdAt in descending order
        const sortedMessages = userDoc.messages.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        console.log("sorted:::",sortedMessages)

        return new Response(JSON.stringify({ success: true, data: sortedMessages }), { status: 200 });
    } catch (error) {
        console.error('Error during GET request:', error);
        return new Response(JSON.stringify({ success: false, message: 'Something went wrong while getting messages' }), { status: 500 });
    }
}
