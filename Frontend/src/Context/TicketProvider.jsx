import TicketBookingContext from './TicketBookingContext'
import { useState } from 'react'

const TicketProvider = ({children}) => {

    const [ticketBooking,setTicketBooking] = useState([])

    const addBooking = (newBooking) => {
        setTicketBooking((prev) => [...prev,newBooking])
    }

  return (
    <TicketBookingContext.Provider value={{ticketBooking,setTicketBooking,addBooking}}  >
            {children}
    </TicketBookingContext.Provider>
  )
}

export default TicketProvider
