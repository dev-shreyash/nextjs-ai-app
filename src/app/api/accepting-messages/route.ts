import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnector';
import UserModel from '@/model/user.model';
import { User } from 'next-auth';

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId =user._id
  const {acceptMessages}= await request.json()
  try {
    const updatedUser =await UserModel.findByIdAndUpdate(
        userId,
        {
            isAcceptingMessage:acceptMessages
        },
        {new:true}
    )
    if(!updatedUser){
        return Response.json({success:false,message:"Something went wrong while updating user"},{status:500})
    }else{
        return Response.json({success:true,message:"Updated successfully"},{status:200})
    }
  } catch (error) {
    console.error(error);
    return Response.json({success:false,message:"Something went wrong"},{status:500})
  }
}


export async function GET(request:Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    if (!session || !session.user) {
      return Response.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
  
    const userId =user._id


   try {
     const userDetails = await UserModel.findById(userId)
 
     if(!userDetails){
         return Response.json({success:false,message:"user not found"},{status:500})
     }else{
         return Response.json({success:true,isAcceptingMessages:userDetails.isAcceptingMessage},{status:200})
     }
 
   } catch (error) {
    console.error(error);
    return Response.json({success:false,message:"Something went wrong while accepting messages"},{status:500})
   }
    
}