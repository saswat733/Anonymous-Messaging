import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from 'bcryptjs'


/*
 the flow of this route 

 if existingUserByemail exists then 
    if existingUserbYemail.isVerified then
        success:false
    else
        //save the updated user
    end if
else
    //create a new user with the provided details
    save the new user
end if

*/
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username,email,password}=await request.json()

        // console.log(username)
      
        //check for the user who have username and is verified
        const existingVerifedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })

        // if exists then send that username is already taken
        if(existingVerifedByUsername){
            return Response.json({
                success:false,
                message:"username is already taken"
            },{
                status:400,
            })
        }


        const existingVerifedByEmail=await UserModel.findOne({email})
        const verifyCode=Math.floor(100000 + Math.random()*900000).toString();
        
        // now check is the user exists by email
        if(existingVerifedByEmail){
            //check for verification
            if(existingVerifedByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User already registered with this email"
                },{status:400})
            }
            else{
                console.log(username)

                const hashedPassword=await bcrypt.hash(password,10)
                existingVerifedByEmail.username=username;
                existingVerifedByEmail.email=email;
                existingVerifedByEmail.password=hashedPassword;
                existingVerifedByEmail.verifyCode=verifyCode;
                existingVerifedByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
               
                await existingVerifedByEmail.save();
            }

            
        }else{
            const hashedPassword=await bcrypt.hash(password,10)
            const expiryDate=new Date();    //since we are using new so it creates a object and object alway have a refrence so it doesn't matter it is const let or var we can still modify it

            expiryDate.setHours(expiryDate.getHours()+1);
            
            

           const newUser= new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                isVerified:false,
                verifyCodeExpiry:expiryDate,
                isAcceptingMessage:true,
                messages:[]
            })
            console.log(newUser)

            await newUser.save()
        }

        //send verification email

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )
        // console.log(emailResponse)

        // if the email is not successfully send
        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500})
        }

        return Response.json({
            success:true,
            message:"User registered successfully. Please verify your email"
        },{status:201})


    } catch (error) {
        console.log("Error registering user in sign-up:",error)
        return Response.json(
            {
                success:false,
                message:"Error reigstering user in sign-up."
            },
            {
                status:500
            }
        )
    }
}
