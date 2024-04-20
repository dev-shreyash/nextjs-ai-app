import {z} from 'zod';

export const usernameValidation =z.string().min(3,"username atleast 3 characters").max(30,"max characters are 30").regex(/^[a-zA-Z0-9_]+$/,"username can only contain letters, numbers and underscores");

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email("invalid email"),
    password:z.string().min(8,{message:"minimus 8 charactes required" })
})