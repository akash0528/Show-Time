import Booking from "../Model/Booking.js";

const CreateBooking = async (req,res) => {

    try {
        const {item,itemType,ticket,totalAmount,theatre,date,time,seats} = req.body;

        if(!item || !itemType ){
            return res.status(400).json({
                message:"Required fields missing"
            })
        }

        if(itemType !== "AdminMovies" && ticket <= 0){
  return res.status(400).json({
    message:"Invalid ticket quantity"
  })
}



  if(itemType === "AdminMovies"){

  if(!seats || seats.length === 0){
    return res.status(400).json({
      message:"No seats selected"
    })
  }

  const existing = await Booking.findOne({
    item,
    theatre,
    date,
    time,
    seats: { $in: seats }
  })

  if(existing){
    return res.status(400).json({
      message:"Seat already Booked"
    })
  }

}

    const booking = await Booking.create({
        user : req.user.id,
        item,
        itemType,
        ticket: itemType === "AdminMovies" ? seats.length : ticket,
        totalAmount,
        seats,
        theatre,
        time,
        date
    })
    return res.status(201).json({message:"Booking Successful",booking})
    } catch (error) {
         res.status(500).json({message:"Booking Failed"})
    }

}

const GetBooking = async (req,res) => {
    try {
     const allBooking = await Booking.find({user : req.user.id}).populate("item").sort({createdAt: -1});
     return res.status(200).json(allBooking)    
    } catch (error) {
        res.status(500).json({message:"Booking are not shown"})
    }
}

const getBookedSeats = async (req,res)=>{

  const {item,theatre,date,time} = req.query

  const bookings = await Booking.find({
    item,
    theatre,
    date,
    time
  })

  const bookedSeats = bookings.flatMap(b => b.seats)

  res.json(bookedSeats)

}

export default {CreateBooking,GetBooking , getBookedSeats};