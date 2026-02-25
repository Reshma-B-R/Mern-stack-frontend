import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const DentaladminDashboard = ({ user, setUser }) => {
  const [stats, setStats] = useState({
    appointments: 0,
    patients: 0,
    doctors: 0,
    doctorsOnLeave: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout button function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchDashboardStats = async () => {
      try {
        const res = await axios.get(
          "https://mern-stack-backend-mlwh.onrender.com/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);

        // ✅ If token invalid → logout (without calling handleLogout)
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/admin/login", { replace: true });
        }
      }
    };

    fetchDashboardStats();
  }, [navigate, setUser]); // ✅ No ESLint warning

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

      {/* ✅ Sidebar */}
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
        {/* <div className="topbar">
          <h2>Analytics</h2>
          <input placeholder="Search..." />
        </div> */}

        <section className="overview">
          <h3>Clinic Overview</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <p>Total Appointments</p>
              <h2>{stats.appointments}</h2>
            </div>

            <div className="stat-card">
              <p>Total Patients</p>
              <h2>{stats.patients}</h2>
            </div>

            <div className="stat-card">
              <p>Doctors Available</p>
              <h2>{stats.doctors}</h2>
              <span className="orange">
                {stats.doctorsOnLeave} on leave
              </span>
            </div>
          </div>
        </section>

        <section className="welcome-box">
          <h3>Welcome, {user?.name}</h3>
          <p>
            Manage your dental clinic efficiently from this dashboard.
          </p>
        </section>
      </main>
    </div>
  );
};

export default DentaladminDashboard;