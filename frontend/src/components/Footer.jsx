function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">Deep Clean & Wash</div>
          <p>
            Professional laundry, sofa cleaning, ironing and deep cleaning
            services for homes and businesses.
          </p>

          <a
            href="https://wa.me/254725290761?text=Hello%20Mitchello%2C%20I%20would%20like%20to%20book%20a%20Deep%20Clean%20%26%20Wash%20service."
            className="footer-whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            💬 Chat with Mitchello
          </a>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <p>Laundry Services</p>
          <p>Ironing Services</p>
          <p>Sofa Cleaning</p>
          <p>Deep Cleaning</p>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <p><strong>Owner:</strong> Mitchello</p>
          <p><strong>Phone:</strong> 0725290761</p>
          <p><strong>WhatsApp:</strong> 0725290761</p>
          <p><strong>Location:</strong> Nairobi, Kenya</p>
        </div>

        <div className="footer-column">
          <h4>Hours</h4>
          <p>Monday - Saturday</p>
          <p><strong>8:00 AM - 6:00 PM</strong></p>
          <p>Sunday: By Appointment</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Deep Clean & Wash. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;