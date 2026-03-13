import AdminActivity from "../Model/AdminActivity.js"
import User from "../Model/user.js"
import AdminMovies from "../Model/AdminMovies.js"
import AdminEvent from "../Model/AdminEvent.js"
import AdminArtist from "../Model/AdminArtist.js"

const GetDashBoard = async (req,res) =>{

    try {
        const totalUser = await User.countDocuments({role:"User"})
        const totalMovies = await AdminMovies.countDocuments();
        const totalEvents = await AdminEvent.countDocuments();
        const totalActivity = await AdminActivity.countDocuments();
        const totalArtist = await AdminArtist.countDocuments();

        res.status(200).json({totalUser,totalActivity,totalArtist,totalEvents,totalMovies})
        
    } catch (err) {
        console.log("Stats fetch error:", err);
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
    }
}

export default GetDashBoard