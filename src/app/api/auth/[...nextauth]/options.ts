import { NextAuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from 'bcryptjs'
import { dbConnect} from "@/lib/dbConnector";
import UserModel from "@/model/user.model";

export const authOptions: NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:'Credentials',
            id:'Credentials',
            credentials:{
                email:{label:'Email',type:'text'},
                password:{label:'Password',type:'password'}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    const user =await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error('no user found with this email')
                    }

                    if(!user.isVerified){
                        throw new Error('user is not verified')
                    }

                    const isPasswordCorrect =await bcrypt.compare(credentials.password,user.password)

                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("Incorrect Password")
                    }
                } catch (error:any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks:{
        
    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,

    
}