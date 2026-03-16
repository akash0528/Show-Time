import AdminMovies from "../Model/AdminMovies.js";
import cloudinary from "../config/Cloudinary.js";

//Post For Movies
const Movie = async (req,res) =>{
    try {
         console.log("REQ BODY:", req.body);
         console.log("REQ FILE:",req.file);
         const theatres = JSON.parse(req.body.theatres);

         for (let i = 0; i < theatres.length; i++) {
  const file = req.files?.[`theatreImage_${i}`];

  if (file) {
    const upload = await cloudinary.uploader.upload(file.path);
    theatres[i].image = upload.secure_url;
  }
}
         
         const uploadImage = await cloudinary.uploader.upload(req.file.path)
        
       const movie = await AdminMovies.create({...req.body,theatres, image:uploadImage.secure_url}) ;
       res.status(201).json({message:"Movies created successfully",movie}) 

    } catch (err) {
      console.error("ADD ERROR:", err);
      res.status(500).json({ message: "Add Movies failed", error: err.message });
        
    }
}

//Get For Movies
const Movies = async (req,res) =>{
    try {
        const movies = await AdminMovies.find()
        res.status(200).json({message:"All movies Are shown",movies})

    } catch (err) {
        console.log("Movies didn't Show",err);
        res.status(500).json({message:"Movies are not Shown",error:err.message})
        
    }
}

//Update For Movies
const MoviesUpdate = async (req,res) => {
    try {

        const updatedData = { ...req.body,}

        if(req.body.theatres){
            updatedData.theatres = JSON.parse(req.body.theatres);
        }

        if(req.file){
           const uploadImage = await cloudinary.uploader.upload(req.file.path);
           updatedData.image = uploadImage.secure_url
        }
        
        const moviesUpdate = await AdminMovies.findByIdAndUpdate(
            req.params.id,
            updatedData,{
                new:true,runValidators:true
            })
        res.status(200).json({message:"Movies Updated Successfully",moviesUpdate})

    } catch (err) {
        console.log("Movies Didn't Update",err);
        res.status(500).json({message:"Movies are not Updated",error:err.message})
    }
}

//Delete for Movies
const MoviesDelete = async (req, res ) =>{
    try{
        const moviesDelete = await AdminMovies.findByIdAndDelete(
        req.params.id,
    )
    if (!moviesDelete) {
            return res.status(404).json({ message: "Movie not Delete !" });
        }
    res.status(200).json({message:"Movies Deleted Successfully",moviesDelete})
    }
    catch(err){
        console.log("Movies didn't Deleted",err);
        res.status(500).json({message:"Movie is not deleted",error:err.message})
    }
    
}

//Edit For Movies
const GetEditMovie = async (req, res) => {
  try {
    const movie = await AdminMovies.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ movie });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
}; 


//Get single Movies for Public Routes
const getmovies = async (req,res) => {
    try {
        const moviesss = await AdminMovies.findById(req.params.id);
        if(!moviesss){
            return res.status(404).json({message:"Movies not Found"})
        }
        return res.status(200).json(moviesss)
    } catch (error) {
        return res.status(500).json({message:"Error fetching Movies"})
    }
}

// Recent Movies 
const recentMovies = async (req,res) => {
    console.log("RecentMovies route hit");
    try {
        const latestmovies = await AdminMovies.find({status: { $regex: "Now Showing", $options: "i" }}).sort({ createdAt: -1 });
         console.log("Not fetch",latestmovies);
        return res.status(200).json(latestmovies)
    } catch (error) {
        console.error("Premier movies fetch error:", error);
        return res.status(500).json({message:"Error fetching recent movies"})
    }
}

//Premier Movies
const premier = async (req,res) => {
    try {
       const premierMovie = await AdminMovies.find({status: { $regex: "Coming Soon", $options: "i" }}).sort({ createdAt: 1 });
       console.log("Premier movies fetched:", premierMovie);
        return res.status(200).json(premierMovie) 
    } catch (error) {
    console.error("Premier movies fetch error:", error);
    return res.status(500).json({
        message:"Error fetching premier movies",
        error:error.message
    })
}
}
export default {Movie,Movies,MoviesUpdate,MoviesDelete,GetEditMovie,getmovies ,recentMovies,premier}