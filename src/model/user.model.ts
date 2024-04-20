import mongoose,{Schema, Document} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date;
    // user:string;
}


const MessageSchema: Schema<Message> =new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifiedCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[];
    createdAt:Date;
}


const UserSchema: Schema<User> =new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        unique:true,
        type:String,
        required:true,
        match:[/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        ,'plz use valid email']
    },
    password:{
        type:String,
        required:true
    },
    verifyCode:{
        type:String,
        required:true
    },
    verifiedCodeExpiry:{
        type:Date,
        required:true,
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        required:true,
        default:true
    },
    messages:[MessageSchema],
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    
})


const UserModel=(mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>('User',UserSchema)


export default UserModel;