import AdminMovies from "../../Controller/AdminMovies.js";
import express from "express"

const MoviesRoutes = express.Router();

MoviesRoutes.get("/movies/recent", AdminMovies.recentMovies);

MoviesRoutes.get("/movies/premier", AdminMovies.premier);

// sirf valid mongo id match karega
MoviesRoutes.get("/movies/:id([0-9a-fA-F]{24})", AdminMovies.getmovies);

export default MoviesRoutes;