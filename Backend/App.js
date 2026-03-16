import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"

import router from "./Routes/user.js"

//Admin Routes
import AdminEventsRoutes from "./Routes/AdminEvent.js"
import AdminMoviesRoutes from "./Routes/AdminMovies.js"
import AdminActivityRoutes from "./Routes/AdminActivity.js"
import AdminArtistRoutes from "./Routes/AdminArtist.js"
import AdminDashboardRouter from "./Routes/AdminDashboard.js"

//user Routes
import ArtistRoutes from "./Routes/User/ArtistRoutes.js"
import ActivityRoutes from "./Routes/User/ActivityRoutes.js"
import EventsRoutes from "./Routes/User/EventRoutes.js"
import MoviesRoutes from "./Routes/User/MoviesRoutes.js"
import HomeRoutes from "./Routes/HomeRoutes.js"


const app = express()

app.use(cors({
    origin:"https://show-time-pi.vercel.app", 
    credentials:true
}))

app.use(express.json())
app.use(cookieParser());

app.use("/auth",router)
app.use("/api/admin", AdminEventsRoutes);
app.use("/api/admin",AdminMoviesRoutes)
app.use("/api/admin",AdminActivityRoutes)
app.use("/api/admin",AdminArtistRoutes)
app.use("/api/admin",AdminDashboardRouter)
app.use("/api",HomeRoutes)
app.use("/api",ArtistRoutes)
app.use("/api",ActivityRoutes)
app.use("/api",EventsRoutes)
app.use("/api",MoviesRoutes)



mongoose.connect(process.env.DBUrl || 5000)
.then(() =>{
    console.log("connected to mongodb");
    app.listen(process.env.PORT,() =>{
        console.log("Server is running on port " + process.env.PORT);
    })  
})
.catch((err =>{
    console.log("Mongodb Connection failed",err)
}))

