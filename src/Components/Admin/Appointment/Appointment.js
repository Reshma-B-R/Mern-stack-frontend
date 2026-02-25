import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "./Appointment.css";

const Appointment = ({ user, setUser }) => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout function (same as dashboard)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  // ✅ Check token + fetch appointments
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `https://mern-stack-backend-mlwh.onrender.com/appointments?search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(res.data);
      } catch (err) {
        console.log("Fetch error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/admin/login", { replace: true });
        }
      }
    };

    fetchAppointments();
  }, [search, navigate, setUser]);

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/Appointment/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete appointment?")) {
      await axios.delete(
        `https://mern-stack-backend-mlwh.onrender.com/appointments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Re-fetch after delete
      const res = await axios.get(
        `https://mern-stack-backend-mlwh.onrender.com/appointments?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAppointments(res.data);
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

      {/* ✅ Sidebar (SAME AS DASHBOARD) */}
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
                to="/Admin/dashboard"
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
                to="/Admin/dashboard/Appointment"
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
            <h2>Appointments</h2>

            <input
              placeholder="Search by patient name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="11" style={{ textAlign: "center" }}>
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((a, index) => (
                    <tr key={a._id}>
                      <td>{index + 1}</td>
                      <td>{a.name}</td>
                      <td>{a.age}</td>
                      <td>{a.gender}</td>
                      <td>{a.phone}</td>
                      <td>{a.service}</td>
                      <td>{a.doctor || "-"}</td>
                      <td>{a.appointmentDate || "-"}</td>
                      <td>{a.appointmentTime || "-"}</td>
                      <td className={`status ${a.status?.toLowerCase()}`}>
                        {a.status}
                      </td>
                      <td>
                        <button
                          className="edit"
                          onClick={() => handleEdit(a._id)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete"
                          onClick={() => handleDelete(a._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointment;