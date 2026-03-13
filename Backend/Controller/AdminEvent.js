import AdminEvent from "../Model/AdminEvent.js";
import cloudinary from "../config/Cloudinary.js";

// ✅ ADD EVENT
const Event = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:",req.file);
    
    const uploadImage = await cloudinary.uploader.upload(req.file.path)

    const event = await AdminEvent.create({...req.body, image:uploadImage.secure_url});
    res.status(201).json({message:"Events created Successfully", event});

  } catch (err) {
    console.error("ADD ERROR:", err);
    res.status(500).json({ message: "Add failed", error: err });
  }
};

// ✅ GET EVENTS
const Events = async (req, res) => {
  try {
    const events = await AdminEvent.find();
    res.status(200).json({message:"All Events Are shown", events});
  } catch (err) {
    console.log("Events Are not Shown",err);
    
    res.status(500).json({message:"Events are not shown", err});
  }
};

// ✅ UPDATE
const EventUpdate = async (req, res) => {
  try {

    const updatedData = { ...req.body,}
    if(req.file){
      const uploadImage = await cloudinary.uploader.upload(req.file.path);
      updatedData.image = uploadImage.secure_url
    }

    const eventUpdated = await AdminEvent.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true , runValidators:true}
    );
    res.status(200).json({message:"Events Updated Successfully", eventUpdated});
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ DELETE
const EventDelete = async (req, res) => {
  try {
   const eventDelete = await AdminEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Events Deleted Successfully",eventDelete });
  } catch (err) {
     console.log("Event didn't Deleted",err);
        res.status(500).json({message:"Movie is not deleted",error:err.message})
  }
};

//Edit Event
const getEditEvent = async (req,res) => {
  try {
    const event = await AdminEvent.findById(req.params.id);
  res.status(200).json({message:"Edit Events are shown", event });

  } catch (err) {
     res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

const GetAllEvents = async (req,res) => {
  try {
    const allEvent = await AdminEvent.find().sort();
  return res.status(200).json(allEvent)  
  } catch (error) {
    res.status(500).json({message:"Failed to fetch Events"})
  }
}

const GetEvents = async (req,res) => {
  try {
     const events = await AdminEvent.findById(req.params.id);
  if(!events){
    return res.status(404).json({message:"Events not Found"})
  }
  return res.status(200).json(events)

  } catch (error) {
    res.status(500).json({message:"Error fetching Events"})
  }
 
}


export default { Event, Events, EventUpdate, EventDelete , getEditEvent, GetAllEvents,GetEvents};
