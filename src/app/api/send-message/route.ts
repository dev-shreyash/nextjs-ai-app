import { dbConnect } from "@/lib/dbConnector";
import UserModel from "@/model/user.model";

import { Message } from "@/model/user.model";

export async function POST(request:Request){
    await dbConnect()


    const {username,content}=await request.json()
    try {
        const user =await UserModel.findOne({username})
        if(!user){
            return Response.json({success:false,message:'user not found'},{status:404})
        }

        if (!user.isAcceptingMessage) {
            return Response.json({success:false,message:'user not accepting messages'},{status:402})
        }
 const newMessage={content,createdAt:new Date()}
        user.messages.push(newMessage as Message) 
        await user.save()
        return Response.json({success:true,message:'Message sent Successfully'},{status:404})

    } catch (error) {
        console.error(error);
    return Response.json({success:false,message:"Something went wrong while sending message"},{status:500})
    }
}
