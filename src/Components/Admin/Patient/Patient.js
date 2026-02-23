import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Patient.css";

const Patient = ({ user, setUser }) => {
  const [appointments, setAppointments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout (same as dashboard)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/Admin/login", { replace: true });
  };

  // ✅ Fetch appointments with token check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Admin/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "https://mern-stack-backend-mlwh.onrender.com/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAppointments(res.data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/Admin/login", { replace: true });
        }
      }
    };

    fetchAppointments();
  }, [navigate, setUser]);

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
                to="/Admin/dashboard/Patients"
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
                to="/Admin/dashboard/doctors"
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
                to="/Admin/dashboard/services"
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
                to="/Admin/dashboard/blog"
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
                to="/Admin/dashboard/reports"
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
        <h2>Patients</h2>

       

        <div className="patients-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Doctor</th>
                <th>Appointment Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((apt, index) => (
                <tr key={apt._id}>
                  <td>{index + 1}</td>
                  <td>{apt.name}</td>
                  <td>{apt.age}</td>
                  <td>{apt.gender}</td>
                  <td>{apt.phone}</td>
                  <td>{apt.service}</td>
                  <td>{apt.doctor}</td>
                  <td>{apt.appointmentDate}</td>
                  <td>{apt.appointmentTime}</td>
                  <td>{apt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </main>
    </div>
  );
};

export default Patient;