import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Deep Clean & Wash
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/booking">Book Service</Link>
        <Link to="/admin-login">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;