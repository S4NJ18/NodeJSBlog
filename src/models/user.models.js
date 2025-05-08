import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema ({
    username :{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    activeStatus:{
        type:Boolean,
        default:true
    },
    password:{
        type:String,
        required:true,
    }

},{timestamps:true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
});

const user = mongoose.model("user",userSchema)

export default user;