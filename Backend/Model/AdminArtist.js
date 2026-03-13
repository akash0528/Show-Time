import { Schema,model } from "mongoose";

const ArtistSchema = new Schema({
    artistName:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    date:{
        type:Date,
       
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    performDetail:{
        type:String,
        required:true
    },
    timing:{
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

const Artist = model("Artist",ArtistSchema)
 
export default Artist;