import { dbConnect } from "@/lib/dbConnector";
import UserModel from "@/model/user.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema=z.object({
    username:usernameValidation
})

export async function GET(request:Request){




    await dbConnect();

    try {
        const {searchParams}=new URL(request.url);
        const querParam={
            username:searchParams.get("username")
        }
        //zod validation
        const result = UsernameQuerySchema.safeParse(querParam);
        console.log(result)
        if(!result.success){
            const usernameError=result.error.format().username?._errors||[]
            return Response.json({success:false,message:"Invalid username",usernameError},{status:400})
        }

        const {username}=result.data;
        const user=await UserModel.findOne({username,isVerified:true})
        if (!user) {
            return Response.json({success:true,message:"Username is available"},{status:200})
        }
        else{
        return Response.json({success:false,message:"Username is not available"},{status:400})
        }
    } catch (error) {
        console.error(error);
        return Response.json({success:false,message:"Something went wrong"},{status:500})
    }
}