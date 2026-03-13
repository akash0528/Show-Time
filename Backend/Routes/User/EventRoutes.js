import AdminEvent from "../../Controller/AdminEvent.js";
import express from "express"


const EventsRoutes = express.Router()

EventsRoutes.get("/events",AdminEvent.GetAllEvents);

EventsRoutes.get("/events/:id",AdminEvent.GetEvents);

export default EventsRoutes