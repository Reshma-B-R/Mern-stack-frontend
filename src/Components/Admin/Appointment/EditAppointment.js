import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import "./Appointment.css";

const EditAppointment = ({ setUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctor: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "Confirmed",
  });

  const [doctors, setDoctors] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Logout (same as dashboard)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  // ✅ Token check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Fetch doctors
    axios
      .get("https://mern-stack-backend-mlwh.onrender.com/doctors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const availableDoctors = res.data.filter(
          (doc) => doc.status === "Available"
        );
        setDoctors(availableDoctors);
      })
      .catch((err) => console.error("Error fetching doctors:", err));

    // Fetch appointment
    axios
      .get(`https://mern-stack-backend-mlwh.onrender.com/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { doctor, appointmentDate, appointmentTime, status } = res.data;
        setForm({ doctor, appointmentDate, appointmentTime, status });
      })
      .catch((err) => console.error("Error fetching appointment:", err));
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://mern-stack-backend-mlwh.onrender.com/appointments/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/admin/dashboard/Appointment");
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">

      {/* ✅ Mobile Topbar */}
      <div className="mobile-topbar">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <h2 className="mobile-logo">DentalUI</h2>
      </div>

      {/* ✅ Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ✅ Sidebar (Same as Dashboard) */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">DentalUI</h2>

          <button
            className="close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        <nav>
          <p className="menu-title">MENU</p>
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                end
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/dashboard/Appointment"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Appointments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/dashboard/patients"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Patients
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/dashboard/doctors"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Doctors
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/dashboard/services"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Services
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/dashboard/blog"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Blog
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/dashboard/reports"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Reports
              </NavLink>
            </li>

            {/* ✅ Logout */}
            <li className="logout-item">
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="main">
        <div className="appointments-page">
          <div className="appointments-header">
            <h2>Assign Appointment</h2>
          </div>

          <form onSubmit={handleSubmit} className="edit-form">
            <label>Doctor</label>
            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>

            <label>Date</label>
            <input
              type="date"
              name="appointmentDate"
              value={form.appointmentDate}
              onChange={handleChange}
              required
            />

            <label>Time</label>
            <input
              type="time"
              name="appointmentTime"
              value={form.appointmentTime}
              onChange={handleChange}
              required
            />

            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <button type="submit" className="edit">
              Save
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditAppointment;