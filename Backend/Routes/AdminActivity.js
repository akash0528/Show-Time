import AdminActivity from "../Controller/AdminActivity.js";
import Home from "../Controller/Home.js";
import upload from "../Middleware/Multer.js";
import express from "express"
import verifyToken from "../Middleware/Auth.js";

const AdminActivityRoutes = express.Router()

//Get Activity Routes // 
AdminActivityRoutes.get("/activity",verifyToken,AdminActivity.Activities)

//Post Activity Routes //
AdminActivityRoutes.post("/activity",verifyToken,upload.single("image"),AdminActivity.Activity);

//Update Activity Routes //
AdminActivityRoutes.put("/activity/:id",verifyToken,upload.single("image"),AdminActivity.ActivityUpdate)

//Delete Activity Routes //
AdminActivityRoutes.delete("/activity/:id",verifyToken,AdminActivity.ActivityDelete)

//Get for Edit Routes
AdminActivityRoutes.get("/activity/:id",verifyToken,AdminActivity.GetEditActivity)

//Patch for feature update
AdminActivityRoutes.patch("/Home/activity/feature/:id",verifyToken,Home.toggleFeatureActivity)

export default AdminActivityRoutes;