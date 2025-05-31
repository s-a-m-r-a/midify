import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import "./Booking.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { user } = useAuth();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const MAX_SEATS = 30;
  const MAX_SELECT = 5;
  const PRICE_PER_SEAT = 10;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5b6aa098ca6a50e070ed4a4bbe11e49e&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error: booking fetch failed.", err));
  }, [id]);

  useEffect(() => {
    if (!date || !time) {
      setBookedSeats([]);
      return;
    }

    const fetchBookedSeats = async () => {
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("movieId", "==", id),
        where("date", "==", date),
        where("time", "==", time)
      );

      try {
        const querySnapshot = await getDocs(q);
        let booked = [];
        querySnapshot.forEach((doc) => {
          const seatNumbers = doc.data().seatNumbers || [];
          booked = [...booked, ...seatNumbers];
        });
        setBookedSeats(booked);
      } catch (err) {
        console.error("Error fetching booked seats:", err);
      }
    };

    fetchBookedSeats();
  }, [date, time, id]);

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length >= MAX_SELECT) {
        alert(`You can select maximum ${MAX_SELECT} seats.`);
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = async () => {
    if (!date || !time) {
      alert("Please select date and time.");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    if (!user) {
      alert("Please sign in to make a booking.");
      navigate('/login');
      return;
    }

    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("movieId", "==", id),
      where("date", "==", date),
      where("time", "==", time)
    );

    try {
      const querySnapshot = await getDocs(q);
      let currentBookedSeats = [];
      querySnapshot.forEach((doc) => {
        const seatNumbers = doc.data().seatNumbers || [];
        currentBookedSeats = [...currentBookedSeats, ...seatNumbers];
      });

      const conflict = selectedSeats.some((seat) =>
        currentBookedSeats.includes(seat)
      );

      if (conflict) {
        alert(
          "Some seats you selected are already booked. Please re-select them."
        );
        setSelectedSeats([]);
        return;
      }

      const bookingData = {
        userId: user.uid,
        movieId: id,
        title: movie?.title,
        date,
        time,
        seats: selectedSeats.length,
        seatNumbers: selectedSeats,
        createdAt: serverTimestamp(),
        pricePerSeat: PRICE_PER_SEAT,
        totalPrice: selectedSeats.length * PRICE_PER_SEAT,
      };
      if (!user?.uid) {
        alert("User not authenticated.");
      return;
}

      await addDoc(bookingsRef, bookingData);
      alert("Booking was successful!");
      setDate("");
      setTime("");
      setSelectedSeats([]);

      navigate('/mybookings');
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("Something went wrong.");
    }
  };

  if (!movie) return <div className="booking-page">Loading..</div>;

  const renderSeats = () => {
    const seatsArray = [];
    for (let i = 1; i <= MAX_SEATS; i++) {
      const isBooked = bookedSeats.includes(i);
      const isSelected = selectedSeats.includes(i);

      seatsArray.push(
        <div
          key={i}
          className={`seat ${isBooked ? "booked" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => toggleSeat(i)}
        >
          {i}
        </div>
      );
    }
    return <div className="seat-map">{seatsArray}</div>;
  };

  return (
    <div className="booking-page">
      <h2>🎟️ Book Tickets for: {movie.title}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Select Date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label>
          Select Time:
          <select value={time} onChange={(e) => setTime(e.target.value)} required>
            <option value="">-- Choose Time --</option>
            <option value="12:00">12:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="21:00">9:00 PM</option>
          </select>
        </label>

        <div className="select-seats">
          <h3>Select Seats (max {MAX_SELECT} seats):</h3>
          {renderSeats()}
        </div>

        <button className="confirm-btn" onClick={handleBooking}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
}