import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePage from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MoviesPage from "./pages/Movies/Movies";
import BookingPage from "./pages/Booking/Booking";
import MyBookings from './pages/MyBookings/MyBookings';
import BookingDetails from './components/BookingDetails/BookingDetails';
import Profile from './pages/Profile/Profile';
import ContactUs from './pages/Contact/Contact';
import FAQ from './pages/FAQ/FAQ';


import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
  <>
    <Navbar />
    <Routes>
        <Route path="/" element = {<HomePage />} />
          <Route path="/movies/:id" element = {
        <ProtectedRoute>
          <MoviesPage />
        </ProtectedRoute>
        }
      />
      <Route path="/booking/:id" element = {
        <ProtectedRoute>
          <BookingPage />
        </ProtectedRoute>
        }
      />
      <Route path="/mybookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      }
      />
      <Route path="/booking-details/:bookingId" element={
        <ProtectedRoute>
          <BookingDetails />
        </ProtectedRoute>
      }
      />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
      />
      <Route path="/login" element = {<Login />} />
      <Route path="/contact-us" element = {<ContactUs />} />
      <Route path="/faq" element = {<FAQ />} />
    </Routes>
  </>
  )
}

export default App;