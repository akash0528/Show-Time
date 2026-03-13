import {Schema , model} from "mongoose";

const eventSchema = new Schema({
  title:{
    type:String,
    required:true
 },
  description: {
    type:String,
  required:true
},
  location: {
    type:String,
  required:true
},
  price: Number,
  image:{
    type:String, 
    required:true,
  },
  date:{
    type:Date,
    required:true,
  },
  eventDetail:{
    type:String,
    required:true
  },
  timing:{
    type:String,
    required:true
  },
  eventType:{
    type:String,
    required:true
  },
  duration:{
    type:String,
    required:true
  },
  language:{
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
},
{timestamps:true});

const AdminEvent = model("AdminEvent", eventSchema)

export default AdminEvent;
