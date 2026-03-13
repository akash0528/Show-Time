import { Outlet } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      
      {/* LEFT - FIXED SIDEBAR */}
      <Sidebar />

      {/* RIGHT - CHANGEABLE CONTENT */}
      <div className="flex-1 h-full overflow-y-auto custom-scrollbar ">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;
