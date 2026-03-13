import express from"express"
import UserController from "../Controller/user.js"
import verifyToken from "../Middleware/Auth.js";
import upload from "../Middleware/Multer.js"
import BookingController from "../Controller/Booking.js";

const router = express.Router();

router.post("/signup",UserController.Signup)

router.post("/signin",UserController.Signin)


router.post("/verify-otp", UserController.verifyotp)

router.put("/updated-avatar",verifyToken,upload.single("avatar"),UserController.updatedAvatar);

router.post("/logout",verifyToken,UserController.logout)

router.get("/profile",verifyToken,UserController.profile)

router.post("/bookings",verifyToken,BookingController.CreateBooking);

router.get("/bookings",verifyToken,BookingController.GetBooking)

router.get("/booking-seat",verifyToken,BookingController.getBookedSeats);

export default router;