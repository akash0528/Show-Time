import AdminMovies from "../../Controller/AdminMovies.js";
import express from "express"

const MoviesRoutes = express.Router();

MoviesRoutes.get("/movies/recent-movies",AdminMovies.recentMovies);

MoviesRoutes.get("/movies/premier-movies",AdminMovies.premier);


export default MoviesRoutes;