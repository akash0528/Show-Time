import { model,Schema } from "mongoose";

const UserSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:""
    },
    role:{
        type:String,
        enum:["admin","User"],
        default:"User"
}
},{timestamps:true})

const User = model("user",UserSchema)

export default User;