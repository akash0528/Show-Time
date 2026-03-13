import AdminArtist from "../../Controller/AdminArtist.js";
import express from "express"

const ArtistRoutes = express.Router();

ArtistRoutes.get("/artist",AdminArtist.GetAllArtist);

ArtistRoutes.get("/artist/:id",AdminArtist.GetArtist);

export default ArtistRoutes;