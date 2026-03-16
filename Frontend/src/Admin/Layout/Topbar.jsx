import adminimg from "../../assets/Userimg.png";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import { Edit2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Topbar = ({ title }) => {
  const { user, updateUser } = useContext(AuthContext);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.put(
        "https://show-time-backend.onrender.com/auth/updated-avatar", // apna backend URL daal
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      updateUser(res.data.updatedUser); // context update
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Image update failed");
    }
  };

  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center rounded-b-lg">
      <div>
        <h2 className="text-xl font-bold text-black ">{title}</h2>
        <p className="text-sm text-black mt-1 ">
          welcome :
          <span className="font-medium text-gray-700">
            {" "}
            {user?.fullName}{" "}
          </span>{" "}
        </p>
      </div>

      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
        <div className="text-right">
          <p className="text-sm font-medium text-blue-500">{user?.fullName}</p>
          <p className="text-xs text-black">{user?.email || "Guest"}</p>
        </div>

        <div className="relative w-12 h-12">
          <img
            className="w-12 h-12 rounded-full object-cover border"
            src={user?.avatar || adminimg}
            alt="avatar"
          />

          {/* Edit Icon Overlay */}
          <label className="absolute bottom-0 right-0 bg-indigo-600 p-1 rounded-full cursor-pointer hover:bg-indigo-700">
            <Edit2 size={14} className="text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
