import nodemailer from "nodemailer"

const sendOtp =async (email,otp) =>{
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: "akashdivakar852@gmail.com",
                pass: "ylvc uejr tfip htzn"
            }
        });

        const mailOptions = {
            from: "akashdivakar852@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your Otp is ${otp}`
        }

        transporter.sendMail(mailOptions)
            .then(() => console.log("OTP sent"))
            .catch(err => console.log("Email send error:", err));
            return true;

    }catch(err){
        console.log(err);
        return false;
    }
}

export default sendOtp;