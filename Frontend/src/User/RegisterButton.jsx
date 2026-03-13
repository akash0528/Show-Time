import { User } from "lucide-react";
import Sidebar from "./Dashboard";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";

const RegisterButton = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const RegisterUser = () => {
    if (!user) {
      navigate("/signin");
      toast.warning("please Signin");
      return;
    }

    setOpen((prev) => !prev);
  };

  return (
    <div>
      <button className="bg-white rounded-full" onClick={RegisterUser}>
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-500 rounded-full">
            <User
              className="bg-gray-500 rounded-full cursor-pointer"
              size={40}
            />
          </div>
        )}
      </button>

      {open && <Sidebar closeSidebar={() => setOpen(false)} isOpen={open} />}
    </div>
  );
};

export default RegisterButton;
