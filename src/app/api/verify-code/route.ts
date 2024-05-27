import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request:Request){
    await dbConnect()

    try {
        const {username, code}=await request.json()

        //
       const decodeUsername= decodeURIComponent(username)
        const user=await UserModel.findOne({username:decodeUsername})
        if(!user){
            return Response.json({
                success:false,
                message:"user not found",
            },{
                status:500
            })
        }


        //checking of the code whether it is valid and not expired
        const isCodeValid=user.verifyCode===code
        const isCodeNotexpired=new Date(user.verifyCodeExpiry)> new Date()

        if(isCodeValid && isCodeNotexpired){
            user.isVerified=true
            await user.save()
            return Response.json({
                success:true,
                message:"account verified successfully",
            },{
                status:200
            })
        }else if(!isCodeNotexpired){
            return Response.json({
                success:false,
                message:"verification expired please signup again"
            },{
                status:400
            })
        }
        else{
            return Response.json({
                success:false,
                message:"incoreect verification code"
            },{
                status:400
            })
        }

    } catch (error) {
        console.log('Error verifying user',error)
        return Response.json({
            success:false,
            message:"error verifying user"
        },{
            status:500
        })
    }

}

