import { useMemo, useState } from "react";
import API from "../api/api";

function BookingForm({ services }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    location: "",
    service_type: "",
    pickup_date: "",
    pickup_time: "",
    notes: "",
  });

  const [message, setMessage] = useState("");
  const [bookingReference, setBookingReference] = useState("");

  const selectedService = useMemo(() => {
    return services.find((service) => service.name === formData.service_type);
  }, [services, formData.service_type]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setBookingReference("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.pickup_date < today) {
      setMessage("Pickup date cannot be in the past.");
      return;
    }

    try {
      const res = await API.post("/bookings", formData);

      setMessage("Booking submitted successfully.");
      setBookingReference(res.data.booking.booking_reference);

      setFormData({
        customer_name: "",
        phone: "",
        location: "",
        service_type: "",
        pickup_date: "",
        pickup_time: "",
        notes: "",
      });
    } catch (error) {
      setMessage("Failed to submit booking.");
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {message && <p className="form-message">{message}</p>}

      {bookingReference && (
        <div className="booking-reference">
          Your booking reference: <strong>{bookingReference}</strong>
        </div>
      )}

      <input
        type="text"
        name="customer_name"
        placeholder="Full Name"
        value={formData.customer_name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Pickup Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <select
        name="service_type"
        value={formData.service_type}
        onChange={handleChange}
        required
      >
        <option value="">Select Service</option>
        {services.map((service) => (
          <option key={service.id} value={service.name}>
            {service.name} - KES {service.base_price}
          </option>
        ))}
      </select>

      {selectedService && (
        <div className="price-estimate">
          Estimated price: <strong>KES {selectedService.base_price}</strong>
        </div>
      )}

      <input
        type="date"
        name="pickup_date"
        min={today}
        value={formData.pickup_date}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="pickup_time"
        value={formData.pickup_time}
        onChange={handleChange}
        required
      />

      <textarea
        name="notes"
        placeholder="Extra notes"
        value={formData.notes}
        onChange={handleChange}
      ></textarea>

      <button type="submit">Submit Booking</button>
    </form>
  );
}

export default BookingForm;