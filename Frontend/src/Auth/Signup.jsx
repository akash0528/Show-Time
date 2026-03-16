import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://show-time-backend.onrender.com/auth/signup",
        formData,
        {
          withCredentials: true,
        },
      );
      toast.success("SignUp Successfully ✅");

      console.log(res.data);
      setFormData({ fullName: "", email: "", password: "" });
      navigate(`/OTP?email=${formData.email}`);
    } catch (error) {
      console.log(error);
      toast.error("SignUp Failed ❌");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-linear-to-r from-indigo-500 to-purple-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h2>

        <form action="" className="space-y-4" onSubmit={submitForm}>
          <div className="flex w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-40">
            <FiUser size={20} className="mt-0.5" />
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={handleChange}
              value={formData.fullName}
              required
              name="fullName"
              className="outline-none ml-2 w-full"
            />
          </div>

          <div className="flex w-full px-2 py-2 border rounded-lg ">
            <MdOutlineMail size={20} className="mt-0.5" />
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              value={formData.email}
              required
              name="email"
              className="outline-none ml-2 w-full"
            />
          </div>

          <div className="flex w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-40">
            <TbLockPassword size={20} className="mt-0.5 " />
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              value={formData.password}
              required
              name="password"
              className="outline-none ml-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transiton cursor-pointer"
          >
            {" "}
            Signup
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already Have a Account! {""}
            <Link to="/signin" className="text-indigo-500 font-semibold">
              SignIn
            </Link>
          </p>

          <button className="flex items-center justify-center gap-2 w-full py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <FcGoogle size={22} /> Sign In with Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
