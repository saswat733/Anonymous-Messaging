import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerifictaionEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
    
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'anony-message verification code',
            react:VerificationEmail({username,otp:verifyCode}),
          });
        return {success:true,message:"verifiction email send succesffuly"}
    } catch (error) {
        console.log("error in sending verification email",error)
        return {success:false,message:"Failed to send verifictaion email"}
    }
}