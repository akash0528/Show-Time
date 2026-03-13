import { Schema,model } from "mongoose";

const MoviesSchema = new Schema({
    title:{
        type:String,
        required:[true, "Movie title is required" ],
        trim:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    rating:{
        type:String,
        enum:["U","UA","A","R"],
        default:"UA"
    },
    language:{
        type:String,
        required:true
    },
    genre:{
        type:[String],
        required:true
    },
    status:{
        type:String,
        enum:["Coming Soon","Now Showing","Archived"],
        default:"Coming Soon"
    },
    director:{
        type:String,
        required:true,
    },
    cast:{
        type:[String],
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    theatres: [
  {
    name:{ type:String},
    location: {type:String},
    times:[String]
  }
]

},
{timestamps:true}
)

const AdminMovies = model("AdminMovies",MoviesSchema)

export default AdminMovies;
