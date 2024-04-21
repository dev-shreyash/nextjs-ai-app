import { log } from "console";
import mongoose from "mongoose";


type ConnObject={
    isConnected?:number
}

const connection:ConnObject={}

export async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        return;
    }

    try {
       const db= await mongoose.connect(process.env.MONGODB_URL || '',{})
        connection.isConnected=db.connections[0].readyState
        
        console.log(connection.isConnected)
        console.log("DB connected successfully")
    } catch (error) {
        console.log("DB connection failed");
        
        process.exit(1)
    }

}