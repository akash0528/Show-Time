import iAppple from "./assets/apple.png"
import playstore from "./assets/play.jpeg"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () =>{
    return( 
       <div className=" bg-black w-full text-white  py-6">

        <div className="grid grid-cols-3 text-center">
            
            <div className=" flex flex-col items-center gap-2">
                <h2 className="text-xl font-semibold mt-1">Download Our App</h2>
                <div className="flex gap-4">
               <a href=""> <img src={playstore} alt="Playstore"className="w-32 h-10 object-contain" /></a>
                <a href=""><img src={iAppple} alt="Playstore" className="w-32 h-10 object-contain" /></a>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-2 items-center">
                <a href="#" className="  cursor-pointer w-fit ">Terms & Conditions</a>
                <a href="#" className=" cursor-pointer w-fit">Connect For Any Help</a>
                <a href="#" className="  cursor-pointer w-fit">About</a>
            </div>

            <div className= " flex flex-col items-center gap-2">
                <h2  className="text-xl font-semibold mt-1">Connect With Us</h2>
                <div className="flex gap-2">
                <a href="">
                     <FaFacebook size={32} className="text-white hover:text-blue-300 cursor-pointer" />
                </a>
                <a href="">
                     <FaInstagram size={32} className="text-white hover:text-fuchsia-600 cursor-pointer" />
                </a>
                <a href="">
                     <FaXTwitter size={32} className="text-white hover:text-blue-500 cursor-pointer" />
                </a>
                </div>
            </div>
        </div>

        <h3 className="text-center">Copyright @ 2025 ScreenTime.inc</h3>

       </div>
    )
}

export default Footer;