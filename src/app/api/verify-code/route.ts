import { dbConnect } from "@/lib/dbConnector";
import UserModel from "@/model/user.model";


export async function POST(request:Request) {
    await dbConnect()

    try {
        const {username,code}=await request.json()

        const decodedUsername=decodeURIComponent(username)

        const user= await UserModel.findOne({username:decodedUsername})
        
        if (!user) {
            return Response.json({success:false,message:"Username not found"},{status:400})
        }

        const isCodeValid=user.verifyCode===code
        const isCodeNotExpired= new Date(user.verifiedCodeExpiry)>new Date()

        if(isCodeValid&&isCodeNotExpired){
            user.isVerified=true
            await user.save()
            return Response.json({success:true,message:"User verified successfully"},{status:200})
        }else{
            return Response.json({success:false,message:"Invalid code or code is expired"},{status:400})
        }
    } catch (error) {
        console.error(error);
        return Response.json({success:false,message:"Something went wrong"},{status:500})
    }
}