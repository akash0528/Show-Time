import Home from "../Controller/Home.js";
import AdminActivity from "../Controller/AdminActivity.js";
import AdminArtist from "../Controller/AdminArtist.js"
import AdminMovies from "../Controller/AdminMovies.js";
import AdminEvent from "../Controller/AdminEvent.js"
import express from "express"

const HomeRoutes = express.Router()

HomeRoutes.get("/home/feature",Home.getAllData);

HomeRoutes.get("/activity/:id",AdminActivity.GetActivity)

HomeRoutes.get("/artist/:id",AdminArtist.GetArtist)

HomeRoutes.get("/event/:id",AdminEvent.GetEvents)

HomeRoutes.get("/movie/:id",AdminMovies.getmovies)

export default HomeRoutes;