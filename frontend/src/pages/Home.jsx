import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import ServiceCard from "../components/ServiceCard";

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="hero-label">Reliable Cleaning & Laundry Services</p>

          <h1>Fresh clothes, cleaner homes, better comfort.</h1>

          <p>
            Deep Clean & Wash helps customers book laundry, ironing, sofa
            cleaning, deep cleaning and pickup wash services with ease.
          </p>

          <div className="hero-actions">
            <Link to="/booking" className="hero-btn">
              Book a Service
            </Link>

            <a
              href="https://wa.me/254725290761?text=Hello%20Mitchello%2C%20I%20would%20like%20to%20book%20a%20Deep%20Clean%20%26%20Wash%20service."
              className="whatsapp-btn"
              target="_blank"
              rel="noreferrer"
            >
              Contact on WhatsApp
            </a>
          </div>

        </div>
      </section>

      <section className="section intro-grid">
        <div className="intro-card">
          <h3>Easy Booking</h3>
          <p>Customers can request a service online in minutes.</p>
        </div>

        <div className="intro-card">
          <h3>Pickup Support</h3>
          <p>Request pickup for laundry and cleaning services.</p>
        </div>

        <div className="intro-card">
          <h3>Admin Tracking</h3>
          <p>The business can manage bookings and update progress.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Select a service and get an estimated price before booking.</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="section why-section">
        <div>
          <h2>Why Choose Deep Clean & Wash?</h2>
          <p>
            We focus on clean results, simple booking, reliable communication
            and professional service handling.
          </p>
        </div>

        <div className="why-list">
          <p>✔ Laundry, ironing and cleaning in one place</p>
          <p>✔ Booking reference for every customer request</p>
          <p>✔ Clear service prices before submission</p>
          <p>✔ WhatsApp contact for quick communication</p>
        </div>
      </section>

      <section className="contact-section">
        <h2>Need cleaning or laundry help?</h2>
        <p>Book online or contact us directly through WhatsApp.</p>

        <Link to="/booking" className="hero-btn">
          Make a Booking
        </Link>
      </section>
    </main>
  );
}

export default Home;