import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import AuthContext from "../Context/AuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "https://show-time-backend.onrender.com/auth/signin",
        formData,
        {
          withCredentials: true,
        },
      );

      toast.success("SignIn Successfully ✅");

      const { User, token } = res.data; //token

      login(User, token);

      if (User.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/Home");
      }

      setFormData({ email: "", password: "" });
    } catch (err) {
      console.log(err);
      toast.error("signin Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <ClipLoader loading={true} />;
      </div>
    );
  }

  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-linear-to-r to-pink-600 from-violet-800 px-4  ">
        <div className=" p-8 shadow-lg rounded-2xl w-96 bg-white backdrop-blur-md ">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            SignIn
          </h2>

          <form action="" className="space-y-4" onSubmit={submitHandle}>
            <div className="flex w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ">
              <MdOutlineMail size={20} className="mt-0.5" />
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                maxLength={35}
                className="outline-none ml-2 w-full "
              />
            </div>

            <div className="flex w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <TbLockPassword size={20} className="mt-0.5 " />
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                minLength={4}
                maxLength={30}
                className="outline-none ml-2 w-full"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link className="hover:underline" to="/signin">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-500  text-white rounded-lg font-semibold hover:bg-indigo-600 transiton text-center cursor-pointer"
            >
              Signin
            </button>
            <p className="text-sm text-gray-600 text-center mt-3">
              Create Account{""}{" "}
              <Link to="/signup" className="text-indigo-500 font-semibold">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;
