import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import StatusBadge from "../components/StatusBadge";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  }

  async function loadData(currentSearch = search, currentStatus = statusFilter) {
    try {
      setLoading(true);

      const statsRes = await API.get("/admin/stats");

      const bookingsRes = await API.get("/bookings", {
        params: {
          search: currentSearch,
          status: currentStatus,
        },
      });

      setStats(statsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Admin dashboard error:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        alert("Admin session failed. Token was rejected by backend.");
        localStorage.removeItem("adminToken");
        navigate("/admin-login");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      loadData(search, statusFilter);
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [search, statusFilter]);

  async function updateStatus(id, status) {
    try {
      await API.put(`/bookings/${id}/status`, { status });

      setNotice("Booking status updated.");

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );

      loadData(search, statusFilter);

      setTimeout(() => {
        setNotice("");
      }, 2500);
    } catch (error) {
      setNotice("Failed to update booking status.");
    }
  }

  return (
    <main className="section">
      <div className="page-header dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Admin: Mitchello — Manage customer bookings and service progress.</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {notice && <p className="live-notice">{notice}</p>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.total_bookings}</h3>
            <p>Total Bookings</p>
          </div>

          <div className="stat-card">
            <h3>{stats.pending_bookings}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>{stats.completed_bookings}</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>{stats.cancelled_bookings}</h3>
            <p>Cancelled</p>
          </div>
        </div>
      )}

      <div className="admin-tools">
        <input
          type="text"
          placeholder="Live search by name, phone, location, service or reference..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Picked Up</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <button type="button" onClick={() => loadData(search, statusFilter)}>
          Refresh
        </button>
      </div>

      {loading && <p className="loading-text">Updating bookings...</p>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Price</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.booking_reference}</td>
                <td>{booking.customer_name}</td>
                <td>{booking.phone}</td>
                <td>{booking.service_type}</td>
                <td>KES {booking.estimated_price}</td>
                <td>{booking.location}</td>
                <td>{booking.pickup_date}</td>
                <td>
                  <StatusBadge status={booking.status} />
                </td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Picked Up</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && bookings.length === 0 && (
          <p className="empty-state">No bookings found.</p>
        )}
      </div>
    </main>
  );
}

export default AdminDashboard;