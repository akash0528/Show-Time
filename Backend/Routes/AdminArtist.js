import AdminArtist from "../Controller/AdminArtist.js";
import Home from "../Controller/Home.js";
import express from "express"
import upload from "../Middleware/Multer.js";
import verifyToken from "../Middleware/Auth.js"

const AdminArtistRoutes = express.Router()

//Get Routes
AdminArtistRoutes.get("/artist",verifyToken,AdminArtist.GetArtists)

//Post Routes For Create Artist
AdminArtistRoutes.post("/artist",verifyToken,upload.single("image"),AdminArtist.PostArtist);

//Update Routes For Update Artist
AdminArtistRoutes.put("/artist/:id",verifyToken,upload.single("image"),AdminArtist.UpdateArtist);

//Delete Routes For Delete Artist
AdminArtistRoutes.delete("/artist/:id",verifyToken,AdminArtist.DeleteArtist);
 
//Get Routes Fot Edit Artist
AdminArtistRoutes.get("/artist/:id",verifyToken,AdminArtist.GetEditArtist)

//Patch for feature update
AdminArtistRoutes.patch("/Home/artist/feature/:id",verifyToken,Home.toggleFeatureArtist)

export default AdminArtistRoutes