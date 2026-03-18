import nodemailer from "nodemailer"

const sendOtp = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
           host: "smtp-relay.brevo.com",
           port: 587, 
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`
        };

       
        const info = await transporter.sendMail(mailOptions);
        console.log("SUCCESS:", info.response);

        return true;

    } catch (err) {
        console.log("FULL ERROR:", err);
        return false;
    }
};

export default sendOtp;