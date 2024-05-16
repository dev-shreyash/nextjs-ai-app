import {resend} from "@/lib/resend"
import { ApiResponse } from "@/types/ApiResponse"
import VerificationEmail from "../../verification-email/verificationEmail";

export async function sendVerifictionEmail(
    email: string,
    username: string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        console.log("email:",email)
      const data= await resend.emails.send({
            from:'onboarding@resend.dev',
            to:'bhosaleshreyash2@gmail.com',
            subject: 'Get Adviced || Veryfcation code',
            react:VerificationEmail ({
                username,
                otp: verifyCode
            })
          })
        return {success:true,message:'successfully sent verification email',data:data}
    } catch (error) {
        console.error("error sending verification email",error);
        return {success:false,message:'failed to send verification email'}       
    }
}