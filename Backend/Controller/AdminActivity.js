import AdminActivity from "../Model/AdminActivity.js";
import cloudinary from "../config/Cloudinary.js";

// Post For Activity
const Activity = async (req,res) => {
    
    try {

        const uploadImage = await cloudinary.uploader.upload(req.file.path)

         const activity = await AdminActivity.create({...req.body, image:uploadImage.secure_url});
        res.status(201).json({message:"Acitivity is Created ",activity})
        
    } catch (err) {
        console.log("Activity Didn't Created",err);
        res.status(500).json({message:"Activity Not Created",error:err.message})
        
    }
}

// Get For Activity
const Activities = async (req,res) => {
    try {
        const activities = await AdminActivity.find();
         res.status(200).json({message:"All Activity are Shown",activities})
    } catch (err) {
        console.log("Actitivies are not shown",err);
        res.status(500).json({message:"Activities are not shown", error:err.message})
    }
}

//Update For Activity
const ActivityUpdate = async (req,res) => {
    try {

        const updatedData = { ...req.body,}
        if(req.file){
            const uploadImage = await cloudinary.uploader.upload(req.file.path);
            updatedData.image = uploadImage.secure_url
        }

        const activityUpdate = await AdminActivity.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new:true,runValidators:true}
        )
        res.status(200).json({message:"Activity are successfully Updated",activityUpdate})
    } catch (err) {
        console.log("Activity are not updated",err);
        res.status(500).json({message:"Activity are not Updated",error:err.message})
    }
}

//Delete for Activity
const ActivityDelete = async (req,res) => {
    try {
        const activityDelete = await AdminActivity.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json({message:"Activity are Deleted Successfully",activityDelete})
    } catch (err) {
        console.log("Activity is not deleted",err);
        res.status(500).json({message:"Activity is not Deleted",error:err.message})
    }
}

//Edit For Activity
const GetEditActivity = async (req,res) => {
    try {
        const activity = await AdminActivity.findById(req.params.id);
        if(!activity){
            return res.status(400).json({message:"Activity Not Found"})
        }
        res.status(200).json({activity})
    } catch (err) {
        res.status(500).json({message:"Fetch failed",error:err.message})
    }
}

const GetAllActivity = async(req,res) => {
    try {
        const allActivity = await AdminActivity.find().sort();
       return res.status(200).json(allActivity)
    } catch (error) {
       return res.status(500).json({message:"Failed to fetch Activity"})
    } 
}

const GetActivity = async(req,res) => {
    try {
        const infoactivity = await AdminActivity.findById(req.params.id);

        if(!infoactivity){
            return res.status(404).json({message:"Activity  not found"})
        }
        return res.status(200).json(infoactivity)
    } catch (error) {
        res.status(500).json({message:"Error fetching Activity"})
    }
}


export default {Activities,Activity,ActivityUpdate,ActivityDelete,GetEditActivity,GetAllActivity,GetActivity}