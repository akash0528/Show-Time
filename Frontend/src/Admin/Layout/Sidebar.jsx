import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFilm,
  FaCalendarAlt,
  FaRunning,
  FaSignOutAlt,
  FaMusic,
} from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Movies", path: "/admin/movies", icon: <FaFilm /> },
    { name: "Events", path: "/admin/events", icon: <FaCalendarAlt /> },
    { name: "Activity", path: "/admin/activity", icon: <FaRunning /> },
    { name: "Artist", path: "/admin/artist", icon: <FaMusic /> },
  ];

  const logoutHandler = async () => {
    try {
      await logout();
      toast.success("Logout Successfully ");
      navigate("/signin");
    } catch (error) {
      toast.error("Logout Failed ", error);
    }
  };

  return (
    <div className="w-74 bg-blue-950 text-white h-screen  flex flex-col">
      {/* TOP */}
      <div className="p-6">
        <h1 className="text-4xl  mb-4 text-center font-black italic tracking-tighter uppercase">
          Show-time
        </h1>
        <h3 className=" text-2xl text-center py-2 font-black italic tracking-tighter uppercase">
          Admin Panel
        </h3>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 rounded-lg mb-3 hover:bg-indigo-500 ${
                isActive ? "bg-indigo-500" : ""
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
        {/* LOGOUT  */}
        <div className="mt-15 p-6">
          <button
            onClick={logoutHandler}
            className="w-full flex items-center gap-3 py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
