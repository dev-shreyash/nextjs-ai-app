import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/lib/dbConnector';
import UserModel from '@/model/user.model';
import { User } from 'next-auth';
import mongoose from 'mongoose';


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
  
    const userId = new mongoose.Types.ObjectId(user.id)
     try {
        const user = await UserModel.aggregate([
            {
                $match:{id:userId}
            },
            {
                $unwind:'$messages'
            },
            {
                $sort:{
                    'messages.createdAt':-1
                }
            },
            {
                $group:{
                    _id:'$_id',
                    messages:{$push:'$messages'}
                }
            }
        ])



        if(!user||user.length===0){
            return Response.json({success:false,message:"User not found"},{status:404})
        }
        return Response.json({
            success:true,
            data:user[0].messages
        },
        {status:200}
    )
    }catch (error) {
         console.error(error);
         return Response.json({success:false,message:"Something went wrong while getting messages"},{status:500})

    }

}
