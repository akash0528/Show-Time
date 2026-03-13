import AdminMovies from "../../Controller/AdminMovies.js";
import express from "express"

const MoviesRoutes = express.Router();

MoviesRoutes.get("/movies/recent",AdminMovies.recentMovies);

MoviesRoutes.get("/movies/premier",AdminMovies.premier);

MoviesRoutes.get("/movies/:id",AdminMovies.getmovies);

export default MoviesRoutes;