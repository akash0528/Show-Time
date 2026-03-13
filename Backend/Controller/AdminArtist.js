import Artist from "../Model/AdminArtist.js";
import cloudinary from "../config/Cloudinary.js";

//Get For All Artist
const GetArtists = async(req,res) => {
    try {
    const artist = await Artist.find()
    res.status(200).json({message:"All Artist are Shown",artist})

    } catch (err) {
        console.log("Artist Are not Shown",err);
        res.status(500).json({message:"Artist are Not Shown",error:err.message})
        
    }
    
}

const PostArtist = async (req,res) => {
        try {
             console.log("REQ BODY:", req.body);
             console.log("REQ FILE:",req.file);

        const uploadImage = await cloudinary.uploader.upload(req.file.path) 

            const createArtist = await Artist.create({...req.body,
            image:uploadImage.secure_url});
            res.status(201).json({message:"Artist Created Successfully",createArtist})
        } catch (err) {
  console.log("FULL ERROR 👉", err);
  res.status(500).json({
    message: "Artist are Not Created",
    error: err.message
  });
}
}

const UpdateArtist = async(req,res) => {
    try {

        const updatedData = {...req.body,}
        if(req.file){
            const uploadImage = await cloudinary.uploader.upload(req.file.path);
            updatedData.image = uploadImage.secure_url
        }

        const updateArtist = await Artist.findByIdAndUpdate(
            req.params.id,
            updatedData,{ 
                new:true, 
                runValidators:true
            }
        )
        res.status(200).json({message:"Artist Updated Successfully",updateArtist})
    } catch (err) {
        console.log("Artist Not Successfully Updated",err);
        res.status(500).json({message:"Artist Not Successfully Updated",error:err.message})
    }
}

const DeleteArtist = async(req,res) => {
    try {
        const artistDelete = await Artist.findByIdAndDelete(req.params.id);
        if(!artistDelete){
            return res.status(404).json({ message: "Artist not Delete !" });
        }
        res.status(200).json({message:"Artist Successfully Deleted",artistDelete})
    } catch (err) {
        console.log("Artist Not Deleted",err);
        res.status(500).json({message:"Artist Not Deleted",error:err.message})
    }
}

//Edit For Artist
const GetEditArtist =async (req,res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if(!artist) {
            return res.status(400).json({message:"Artist not Found"})
        }
        res.status(200).json({artist})
    } catch (err) {
        res.status(500).json({message:"Fetch failed",error:err.message})
    }
}

const GetAllArtist = async (req, res) => {
  try {
    const artists = await Artist.find().sort();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch artists" });
  }
};

const GetArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artist" });
  }
};

export default {GetArtists,PostArtist,DeleteArtist,UpdateArtist,GetEditArtist,GetAllArtist,GetArtist}