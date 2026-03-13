import AdminMovies from "../Controller/AdminMovies.js";
import Home from "../Controller/Home.js";
import verifyToken from "../Middleware/Auth.js";
import express from "express"
import upload from "../Middleware/Multer.js";

const AdminMoviesRoutes = express.Router()

//Get movies//
AdminMoviesRoutes.get("/movies",verifyToken,AdminMovies.Movies)

//Create Movie post//
AdminMoviesRoutes.post("/movie",verifyToken,upload.single("image") ,AdminMovies.Movie)

//Get For Edit Movie Routes 
AdminMoviesRoutes.get("/movies/:id",verifyToken,AdminMovies.GetEditMovie)

//Update Movies Routes//
AdminMoviesRoutes.put("/movies/:id",verifyToken,upload.single("image"),AdminMovies.MoviesUpdate)

//Delete Movie Routes//
AdminMoviesRoutes.delete("/movies/:id",verifyToken,AdminMovies.MoviesDelete)

//Patch for feature update
AdminMoviesRoutes.patch("/Home/movies/feature/:id",verifyToken,Home.toggleFeatureMovies)

export default AdminMoviesRoutes;