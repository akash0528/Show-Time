import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;

    if(!token)
        return res.status(401).json({message:"Access Denied. No token provided"})

    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET,)
        req.user = verified;
        next()
    } catch(err){
        console.log(err);
        return res.status(401).json({message:"invalid token or expires token"})
        
    }
}

export default verifyToken;