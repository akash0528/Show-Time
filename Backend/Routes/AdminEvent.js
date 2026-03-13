import AdminEvent from "../Controller/AdminEvent.js";
import Home from "../Controller/Home.js";
import express from"express"
import upload from "../Middleware/Multer.js"
import verifyToken from "../Middleware/Auth.js";

const AdminEventsRoutes = express.Router()

AdminEventsRoutes.get("/events",verifyToken,AdminEvent.Events)

AdminEventsRoutes.post("/events",verifyToken,upload.single("image"),AdminEvent.Event)

AdminEventsRoutes.put("/events/:id" ,verifyToken,upload.single("image"), AdminEvent.EventUpdate)

AdminEventsRoutes.delete("/events/:id",verifyToken,AdminEvent.EventDelete)

// get EditEvent 
AdminEventsRoutes.get("/events/:id",verifyToken,AdminEvent.getEditEvent)

//Patch for feature update
AdminEventsRoutes.patch("/Home/event/feature/:id",verifyToken,Home.toggleFeatureEvent)

export default AdminEventsRoutes;