import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import "./BookingDetails.css";

export default function BookingDetails() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const docRef = doc(db, "bookings", bookingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooking(docSnap.data());
        } else {
          setError("Booking wasn't found.");
        }
      } catch (err) {
        setError("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [bookingId]);

  if (loading) return <div className="booking-detail-page">Loading..</div>;
  if (error) return <div className="booking-detail-page error">{error}</div>;

  return (
    <div className="booking-detail-page">
      <h2>Booking Details</h2>
      <div className="booking-info">
        <h3>{booking.title}</h3>
        <p><b>Date:</b> {booking.date}</p>
        <p><b>Session:</b> {booking.time}</p>
        <p><b>Number of seats:</b> {booking.seats}</p>
        <p><b>Movie ID:</b> {booking.movieId}</p>
      </div>
      <Link to="/mybookings" className="go-back">Go Back</Link>
    </div>
  );
}
