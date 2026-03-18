import User from "../Model/user.js";
import bcrypt from "bcrypt"
import generateToken from "../Services/Auth.js";
import sendOtp from "../Services/otp.js";
import cloudinary from "../config/Cloudinary.js";

let tempUserData = {}

const Signup = async (req,res) =>{
    const {fullName,email,password} = req.body; 
    try{

         // 🛑 Email exists check
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User Already Registered"});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const otp = Math.floor(1000 + Math.random()*9000)

        tempUserData[email] = {
            fullName,
            email,
            password:hashedPassword,
            otp,
            expiry: Date.now() + 5 * 60 * 1000};

             sendOtp(email,otp)
            return res.status(200).json({
                message:"Otp send to your email",
            })



    } catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
};

const Signin = async (req,res) =>{
    const {email,password} = req.body;
    try{
        // find user
        const findUser = await User.findOne({email});
        if(!findUser)
             return res.status(400).json("Invalid Email or Password")

        //compare Password
        const IsmatchedPassword = await bcrypt.compare(password,findUser.password);
        if(!IsmatchedPassword)
            return res.status(400).json("Invalid Password");

         // 👉 Generate Token After Signin Completed
    const token = generateToken({
        id: findUser._id,
        role:findUser.role
    });

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });

     return res.status(200).json({message:"Signing Successfully", User:{
        fullName:findUser.fullName,
        email:findUser.email,
        avatar:findUser.avatar,
        role:findUser.role,
        _id:findUser.id
     },token})

    }catch(err){
        console.log(err,);
        return res.status(400).json({message:"something went wrong"})
        
    }
}


const verifyotp =async (req,res) =>{
    const {email,otp} = req.body;

    const userdata = tempUserData[email];
    if(!userdata) 
      return res.status(400).json({message:"No Signup Request have found"})  

    if(userdata.expiry < Date.now())
      return res.status(400).json({message:"OTP Expires"})
    
    if(userdata.otp != otp)
    return res.status(400).json({message:"Invalid Otp"})

    const newUser = await User.create({
        fullName: userdata.fullName,
        email : userdata.email,
        password : userdata.password
    })

    delete tempUserData[email];

     // 👉 Generate Token After Signup Completed
    const token = generateToken({
        id: newUser._id,
        role:newUser.role
    });

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });

    return res.status(200).json({message:"OTP Verifyed, Signup Completed" , User : newUser,token})
}

const updatedAvatar = async (req,res) => {
    try {
        
        if(!req.file){
           return res.status(400).json({message:"No image uploaded"})
        }

         const uploadAvatar = await cloudinary.uploader.upload(req.file.path);

        const updatedUser = await User.findByIdAndUpdate(req.user.id,
            {avatar:uploadAvatar.secure_url},
            {new:true}
        )
        res.status(200).json({message:"Avatar Updated successfully ",updatedUser})

    } catch (error) {
        console.log("Avatar not Updated",error);
       return res.status(500).json({message:"Avatar are Not Updated",err:error.message})
    }
}

const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
};

const profile = async (req, res) => {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message: "Profile fetched",
        user
    });
};

export default {Signup,Signin , verifyotp,updatedAvatar,logout,profile}