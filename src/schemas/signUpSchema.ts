import { z } from "zod";
//this is just for username check
export const usernameValidation=z
    .string()
    .min(2,'username must be atleast 2 characters')
    .max(20,'username must not be more than 20 characters')
    .regex(/^[a-zA-Z0-9]+$/,'username must not contain special characters')


//building signup schema using zod
export const signUpSchema= z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"password must be at least 6 characters"})
})


