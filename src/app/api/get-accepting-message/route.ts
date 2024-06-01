import { dbConnect } from '@/lib/dbConnector';
import UserModel from '@/model/user.model';

export async function POST(req: Request) {
    await dbConnect();
    let username;
  
    try {
      // Assuming the request body contains JSON with the username
      const body = await req.json();
      username = body.username;
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid request body' }), { status: 400 });
    }
  
    // Find user by username
    const user = await UserModel.findOne({ username }).exec();
  
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
    }
  
    try {
      // Fetch the user's status of acceptingMessage
      const userStatus = await UserModel.findById(user._id, 'isAcceptingMessage').exec();
  
      if (!userStatus) {
        return new Response(JSON.stringify({ success: false, message: 'Something went wrong while fetching user status' }), { status: 500 });
      }
  
      return new Response(JSON.stringify({ success: true, message: 'Fetched successfully', acceptingMessage: userStatus.isAcceptingMessage }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ success: false, message: 'Something went wrong' }), { status: 500 });
    }
  }