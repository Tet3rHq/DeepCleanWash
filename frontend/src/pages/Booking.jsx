import { useEffect, useState } from "react";
import API from "../api/api";
import BookingForm from "../components/BookingForm";

function Booking() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="section">
      <div className="page-header">
        <h1>Book a Cleaning Service</h1>
        <p>Fill in your details and we will contact you to confirm.</p>
      </div>

      <BookingForm services={services} />
    </main>
  );
}

export default Booking;