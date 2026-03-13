import { Route, Routes } from "react-router-dom";
import Movies from "../src/Movies/Movies";
import Home from "../src/Home/Home";
import Events from "../src/Events/Events";
import Booking from "../src/Booking/Booking";
import OtpForm from "../src/Auth/OTP";
import Signup from "../src/Auth/Signup";
import SignIn from "../src/Auth/SignIn";
import Artist from "../src/Artist/Artist";
import SeatBooking from "../src/Booking/SeatBooking";
import TicketProvider from "../src/Context/TicketProvider";
import Activity from "../src/Activity/Activity";
import ActivityNav from "../src/Activity/ActivityNav";
import AdminRoutes from "../src/Admin/Routes/AdminRoutes";
import Mainlayout from "../src/Mainlayout";
import AuthProvider from "../src/Context/AuthProvider";
import MovieDetails from "../src/Movies/MovieDetails";

import { SearchProvider } from "../src/Context/SearchProvider";
import AllEvents from "../src/Events/AllEvents";
import ProtectedRoute from "../src/Auth/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <TicketProvider>
          <Routes>
            <Route element={<Mainlayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Movies" element={<Movies />} />
              <Route path="/Events" element={<Events />} />
              <Route path="/Activity" element={<Activity />} />
              <Route
                path="/Booking"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/Event/:id" element={<AllEvents />} />
              <Route path="/activity/:id" element={<ActivityNav />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/seat-booking/:id" element={<SeatBooking />} />
            </Route>

            <Route path="/OTP" element={<OtpForm />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Signin" element={<SignIn />} />

            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </TicketProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
