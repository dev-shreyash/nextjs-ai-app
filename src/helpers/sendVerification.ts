import {resend} from "@/lib/resend"
import VerificationEmail from "../../verification-email/verificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerifictionEmail(
    email: string,
    username: string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        resend.emails.send({
            from:'onboarding@resend.dev',
            to: email,
            subject: 'Get Adviced || Veryfcation code',
            react:VerificationEmail({
                username,
                otp: verifyCode
            })
          })
        return {success:true,message:'successfully sent verification email'}
    } catch (error) {
        console.error("error sending verification email",error);
        return {success:false,message:'failed to send verification email'}       
    }
}