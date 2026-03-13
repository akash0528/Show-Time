import Topbar from "../Layout/Topbar";
import StatsCard from "../Layout/StateCard";
import { FaFilm, FaCalendarAlt, FaUsers ,FaMusic,FaRunning } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/dashboard/stats",
          { withCredentials: true });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex-1 p-6">
      <Topbar title="Admin Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <StatsCard
          title="Movies"
          value={stats.totalMovies || 0}
          icon={<FaFilm />}
          gradient="bg-gradient-to-r from-indigo-500 to-purple-600"
        />
        <StatsCard
          title="Events"
          value={stats.totalEvents || 0}
          icon={<FaCalendarAlt />}
          gradient="bg-gradient-to-r from-pink-500 to-yellow-500"
        />
        <StatsCard
          title="Users"
          value={stats.totalUser || 0}
          icon={<FaUsers />}
          gradient="bg-gradient-to-r from-green-400 to-blue-500"
        />
        <StatsCard
          title="Activity"
          value={stats.totalActivity || 0}
          icon={<FaRunning />}
          gradient="bg-gradient-to-r from-red-400 to-blue-500"
        />
        <StatsCard
          title="Artist"
          value={stats.totalArtist || 0}
          icon={<FaMusic />}
          gradient="bg-gradient-to-r from-yellow-400 to-blue-500"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
