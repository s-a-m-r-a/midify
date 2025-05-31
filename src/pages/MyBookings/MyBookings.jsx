import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { updateDoc, doc } from "firebase/firestore";
import {Album} from 'lucide-react';
import "./MyBookings.css";

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

const handleCancel = async (bookingId) => {
  const confirmCancel = window.confirm("Are you sure on canceling this reservation?");
  if (!confirmCancel) return;

  try {
    await updateDoc(doc(db, "bookings", bookingId), {
      status: "cancelled",
    });

    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    alert("Reservation successfully canceled.");
  } catch (error) {
    console.error("Error: canceling failed.", error);
    alert("Canceling failed.");
  }
};


  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );

      try {
        const snapshot = await getDocs(q);
        const userBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((booking) => booking.status !== "cancelled");

        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <div className="mybookings-page">Loading..</div>;

  return (
    <div className="mybookings-page">
      <h2><Album size={28}/> My Bookings</h2>

      {bookings.length === 0 ? (
        <div>You haven't made any bookings yet.</div>
      ) : (
        <ul className="bookings-list">
  {bookings.map((booking) => (
    <li key={booking.id} className="booking-item">
      <h4>{booking.title}</h4>
      <p><b>Date: </b> {booking.date}</p>
      <p><b>Time:</b> {booking.time}</p>
      <p><b>Seats:</b> {booking.seats}</p>
      <p><b>Total:</b> ${booking.totalPrice}</p>

      <Link to={`/booking-details/${booking.id}`} className="detail-btn">Booking Details</Link>

      <button className="cancel-btn" onClick={() => handleCancel(booking.id)}>
        Cancel ❌
      </button>
    </li>
  ))}
</ul>
      )}
    </div>
  );
}