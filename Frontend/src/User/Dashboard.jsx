import {
  MdDashboard,
  MdMovie,
  MdEventSeat,
  MdHelp,
  MdFavorite,
} from "react-icons/md";
import { CircleArrowLeft, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserImg from "../assets/Userimg.png";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = ({ closeSidebar, isOpen }) => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      // clear logout
      await logout();
      toast.success("Logout Successfully ");

      // close side bar
      closeSidebar();
      // navigate to signin
      navigate("/signin");
    } catch (error) {
      toast.error("Logout Failed ");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const loadingToast = toast.loading("Updating image..");
    try {
      // Backend url for update avatar
      const res = await axios.put(
        "http://localhost:5000/auth/updated-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      updateUser(res.data.updatedUser); // context update

      setEditing(false);
      toast.update(loadingToast, {
        render: "Profile Updated Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Image update failed");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-screen w-[80%] max-w-xs md:w-80 bg-gray-800 text-white p-4 z-40 transform transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="flex items-center">
          <button
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={closeSidebar}
          >
            <CircleArrowLeft size={30} />
          </button>
          <h1 className="text-2xl font-bold px-6 py-5 text-center">
            🎬 Show-Time
          </h1>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center mt-4 relative">
          <img
            src={user?.avatar ? user.avatar : UserImg}
            alt="Profile"
            className="w-20 h-20 rounded-full object-fill border-2 border-white"
          />
          {/* Edit icon */}
          <button
            className="absolute mt-14 ml-6  p-1 rounded-full hover:bg-indigo-600 cursor-pointer"
            onClick={() => setEditing(true)}
          >
            <Edit2 size={16} />
          </button>
          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
          <p className="text-center font-bold mt-2 text-white">
            Welcome {user?.fullName}
          </p>
        </div>

        {/* Menu */}
        <ul className="mt-6 space-y-2 px-4">
          <li className="flex items-center gap-3 p-3 hover:bg-indigo-600 rounded-lg cursor-pointer">
            <MdDashboard size={22} /> Dashboard
          </li>
          <li className="flex items-center gap-3 p-3 hover:bg-indigo-600 rounded-lg cursor-pointer">
            <MdMovie size={22} /> Movieslist
          </li>
          <li
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer"
            onClick={() => navigate("/Booking")}
          >
            <MdEventSeat size={22} /> Bookings
          </li>

          <li className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
            <MdHelp size={22} /> Help
          </li>
        </ul>

        {/* Logout */}
        <button
          onClick={logoutHandler}
          className="block mx-auto w-24 h-10 mt-6 bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
