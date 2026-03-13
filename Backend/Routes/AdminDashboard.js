import GetDashBoard from "../Controller/GetDashboardState.js";
import express from "express"

const AdminDashboardRouter = express.Router()

AdminDashboardRouter.get("/dashboard/stats",GetDashBoard)

export default AdminDashboardRouter;