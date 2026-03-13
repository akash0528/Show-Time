import AdminActivity from "../../Controller/AdminActivity.js";
import express from "express"

const ActivityRoutes = express.Router()

ActivityRoutes.get("/activity",AdminActivity.GetAllActivity)

ActivityRoutes.get("/activity/:id",AdminActivity.GetActivity);

export default ActivityRoutes; 