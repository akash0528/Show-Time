import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import RegisterButton from "./User/RegisterButton";
import logo from "./assets/logo1.png";
import { motion } from "motion/react";

const Navbar = () => {
  return (
    <nav className=" bg-blue-500 md:px-6 px-1 md:py-6 py-4  text-white  ">
      {/* //Top row */}
      <div className="flex justify-between items-center gap-2 md:gap-4">
        <h4 className="md:text-2xl md:block px-2 py-2 font-bold text-sm">
          Show-Time
        </h4>

        {/* Logo For Both Desktop or Mobile */}
        <motion.img
          animate={{ y: [25, 0, 25] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeIn" }}
          src={logo}
          alt="logo"
          className="hidden rounded-full w-16 h-12  md:w-30 md:h-14"
        />

        {/* Menu For Both Desktop & Mobile */}
        <ul className="flex justify-between bg-white rounded-full w-80 md:w-110 font-bold text-black ">
          <li className="hover:bg-blue-100 p-2 rounded-l-full cursor-pointer">
            <Link to="/Home">Home</Link>
          </li>
          <li className="hover:bg-blue-100 p-2 rounded-md cursor-pointer">
            <Link to="/Movies">Movies</Link>
          </li>
          <li className="hover:bg-blue-100 p-2 rounded-md cursor-pointer">
            <Link to="/Events">Events</Link>
          </li>
          <li className="hover:bg-blue-100 p-2 rounded-r-full cursor-pointer">
            <Link to="/Activity">Activity</Link>
          </li>
        </ul>

        {/* SearchBar For Desktop Only */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        <RegisterButton />
      </div>

      {/* SearchBar for Mobile  */}
      <div className="mt-1 mx-2 ml-6 flex justify-center md:hidden px-3">
        <div className=" max-w-45 mx-auto">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
