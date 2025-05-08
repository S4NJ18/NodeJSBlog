import dotenv from 'dotenv';
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

dotenv.config();
const connectDB = async()=>{
    try{
        const connectionInstence = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         console.log(`Connected with ${connectionInstence.connection.host}` )
        
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}

export {connectDB};