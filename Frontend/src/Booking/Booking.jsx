import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Booking = () => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/bookings", {
          withCredentials: true,
        });
        setBooking(res.data);
      } catch (error) {
        toast.error("Booking Not Found");
      }
    };
    fetchBooking();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (!booking || booking.length === 0) {
    return (
      <div className="min-h-screen flex py-20 justify-center text-xl md:text-2xl font-semibold text-black">
        No Booking Found 😕
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* --- Main Wrapper Div (Laptop & Mobile shared) --- */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border overflow-hidden">
        {/* Title Section (Aapke original design ke mutabik div ke andar) */}
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            My Bookings
          </h2>
        </div>

        {/* --- LAPTOP VIEW (Table) --- */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-red-600 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">S.No</th>
                <th className="px-6 py-4 whitespace-nowrap">Show</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-4 py-4 text-center">Tickets</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-6 py-4 min-w-37.5">Location</th>
                <th className="px-6 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {booking.map((ticket, index) => (
                <tr key={ticket._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {ticket.item?.title}
                  </td>
                  <td className="px-6 py-4 text-black whitespace-nowrap">
                    {ticket.itemType === "AdminActivity" && "Activity"}
                    {ticket.itemType === "AdminEvent" && ticket.item?.eventType}
                    {ticket.itemType === "Artist" &&
                      `Concert ${ticket.item?.performDetail || ""}`}
                    {ticket.itemType === "AdminMovies" && "Movie"}
                  </td>
                  <td className="px-4 py-4 text-center">{ticket.ticket}</td>
                  <td className="px-6 py-4 text-black whitespace-nowrap text-sm">
                    {ticket.itemType === "AdminMovies"
                      ? `${formatDate(ticket.item.releaseDate)} , ${ticket.time}`
                      : ticket.item?.date
                        ? formatDate(ticket.item.date)
                        : ticket.item?.timing}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-black text-sm">
                    {ticket.itemType === "AdminMovies"
                      ? `${ticket.theatre}, ${ticket.item?.theatres?.find((t) => t.name === ticket.theatre)?.location || ""}`
                      : ticket.item?.location}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-indigo-600 whitespace-nowrap">
                    ₹{ticket.totalAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE VIEW (Cards inside the same main white div) --- */}
        <div className="md:hidden bg-gray-50 p-4 space-y-4">
          {booking.map((ticket, index) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow border border-gray-100 p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-xs font-bold">
                  #{index + 1}
                </span>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
                  CONFIRMED
                </span>
              </div>

              <h3 className="text-md font-bold text-black mb-1">
                {ticket.item?.title}
              </h3>
              <p className="text-[10px] text-red-600 font-bold uppercase mb-3 tracking-tighter">
                {ticket.itemType.replace("Admin", "")}
              </p>

              <div className="space-y-2 text-[12px] border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-gray-700 font-medium">
                    {ticket.item?.date ? formatDate(ticket.item.date) : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seats:</span>
                  <span className="text-gray-700 font-medium">
                    {ticket.ticket} Tickets
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400 shrink-0">Loc:</span>
                  <span className="text-gray-700 font-medium text-right truncate">
                    {ticket.item?.location || ticket.theatre}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                <span className="text-gray-500 font-bold text-[10px]">
                  TOTAL
                </span>
                <span className="text-lg font-black text-indigo-600">
                  ₹{ticket.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
