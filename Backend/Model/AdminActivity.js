import {Schema , model } from "mongoose"

const AdminActivitySchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
       
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:String,
       
    },
    ageLimits:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    timing:{
        type:String,
        required:true
    },
    customDateText:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    featuredPriority:{
        type:Number,
        default:null
    }

    },{timestamps:true})

const AdminActivity = model("AdminActivity",AdminActivitySchema)

export default AdminActivity;