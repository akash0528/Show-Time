import  { Schema,model } from "mongoose";

const BookingSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    item:{
        type:Schema.Types.ObjectId,
        required:true,
        refPath:"itemType"
    },
    itemType:{
        type:String,
        required:true,
        enum:["AdminMovies","AdminEvent","Artist","AdminActivity"]
    },
    ticket:{
        type:Number,
        required:true
    },

     theatre:{
        type:String
    },

  date:{
    type:String
},
  time:{
    type:String
},
  seats:
  {type:[String]
    
  },
    totalAmount:{
        type:Number,

    },
    bookingDate:{
        type:Date,
        default:Date.now
    }

},{timestamps:true})

const Booking = model("Booking",BookingSchema);

export default Booking