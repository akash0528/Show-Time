import AdminActivity from "../Model/AdminActivity.js";
import Artist from "../Model/AdminArtist.js";
import AdminMovies from "../Model/AdminMovies.js";
import AdminEvent from "../Model/AdminEvent.js";

const getAllData = async (req,res) => {

    try {
        const [events,activity,artist,movies] = await Promise.all([
        AdminEvent.find({isFeatured:true}).limit(2).lean(),
        Artist.find({isFeatured:true}).limit(2).lean(),
        AdminActivity.find({isFeatured:true}).limit(2).lean(),
        AdminMovies.find({isFeatured:true}).limit(2).lean()
    ])

    const homeData = [
        ...events.map(e => ({...e , type:"AdminEvent"})),
        ...artist.map(e => ({...e , type:"Artist"})),
        ...activity.map(e => ({...e , type:"AdminActivity"})),
        ...movies.map(e => ({...e , type:"AdminMovies"}))
    ]

    return res.status(200).json(homeData)
    } catch (error) {
        return res.status(500).json({message:"Couldn't Fetch data "})
    }
    
}

const toggleFeatureEvent = async (req,res) => {
    try {
        const {isFeatured} = req.body;
      const EventFeature = await AdminEvent.findByIdAndUpdate(
        req.params.id,
        {isFeatured},
        {new:true}
      )
      if(!EventFeature){
   return res.status(404).json({message:"Event not found"})
}
      return res.status(200).json(EventFeature)
    } catch (error) {
        return res.status(500).json({message:"Event Data Not Updated",error})
    }
}

const toggleFeatureArtist = async (req,res) => {
    try {
        const {isFeatured} = req.body;
        const ArtistFeature = await Artist.findByIdAndUpdate(
            req.params.id,
            {isFeatured},
            {new:true}
        )
        if(!ArtistFeature){
   return res.status(404).json({message:"Artist not found"})
}
         return res.status(200).json(ArtistFeature)
    } catch (error) {
        return res.status(500).json({message:"Artist Data Not Updated",error})
    }
}

const toggleFeatureActivity = async (req,res) => {
    try {
        const {isFeatured} = req.body;
        const ActivityFeature = await AdminActivity.findByIdAndUpdate(
            req.params.id,
            {isFeatured},
            {new:true}
        )
        if(!ActivityFeature){
   return res.status(404).json({message:"Activity not found"})
}
         return res.status(200).json(ActivityFeature)
    } catch (error) {
         return res.status(500).json({message:"Activity Data Not Updated",error})
    }
}

const toggleFeatureMovies = async (req,res) => {
    try {
        const {isFeatured} = req.body;
        const MoviesFeature = await AdminMovies.findByIdAndUpdate(
            req.params.id,
            {isFeatured},
            {new:true}
        )
        if(!MoviesFeature){
   return res.status(404).json({message:"Movies not found"})
}
         return res.status(200).json(MoviesFeature)
    } catch (error) {
        return res.status(500).json({message:"Movies Data Not Updated",error})
    }
}

export default {getAllData,toggleFeatureEvent,toggleFeatureActivity,toggleFeatureArtist,toggleFeatureMovies}