import AdminLayout from '../Layout/AdminLayout'
import { Routes, Route } from "react-router-dom";
import AdminDashboard from '../pages/AdminDashboard';
import AdminEvents from '../pages/AdminEvent';
import AddEvent from "../pages/Add/AddEvent";
import AdminMovies from '../pages/AdminMovies';
import AddMovies from '../pages/Add/AddMovies';
import AdminActivity from "../pages/AdminActivity"
import AddActivity from "../pages/Add/AddActivity"
import EditMovie from '../pages/Edit/EditMovie';
import EditEvent from '../pages/Edit/EditEvent';
import EditActivity from '../pages/Edit/EditActivity';
import AdminArtist from "../pages/AdminArtist"
import AddArtist from "../pages/Add/AddArtist"
import EditArtist from '../pages/Edit/EditArtist';

const AdminRoutes = () => {
  return (
    <>
      <Routes>

      <Route path="/" element={<AdminLayout />}>

      {/* Default Page */}
       <Route index element={<AdminDashboard />} /> 

      {/* AdminDashboard */}
      <Route path="dashboard" element={<AdminDashboard/>}/>
      
      {/* Events Routes */}
      <Route path="events" element={<AdminEvents />} />
      <Route path="events/add" element={<AddEvent />} />
      <Route path="events/edit/:id" element={<EditEvent/>} />

      {/* Movies Routes */}
      <Route path="movies" element={<AdminMovies/>} />
      <Route path="movies/add" element={<AddMovies isOpen={true}/>} />
      <Route path="movies/edit/:id" element={<EditMovie/>} />

      {/* Activity Routes */}
      <Route path="activity" element={<AdminActivity/>} />
      <Route path="activity/add" element={<AddActivity/>} />
      <Route path="activity/edit/:id" element={<EditActivity/>} />

      {/* Artist */}
      <Route path="artist" element={<AdminArtist/>} />
      <Route path="artist/add" element={<AddArtist/>} />
      <Route path="artist/edit/:id" element={<EditArtist/>} />
     
     </Route>
    </Routes>
    </>
  )
}

export default AdminRoutes
