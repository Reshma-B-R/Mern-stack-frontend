import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Service.css";

const Services = ({ user, setUser }) => {
  const [services, setServices] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("https://mern-stack-backend-mlwh.onrender.com/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete service
  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await axios.delete(`https://mern-stack-backend-mlwh.onrender.com/services/${id}`);
      fetchServices();
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Topbar */}
      <div className="mobile-topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <h2 className="mobile-logo">DentalUI</h2>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">DentalUI</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
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

            {/* Logout */}
            <li className="logout-item">
              <button type="button" className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <h2>Services</h2>

        <div className="services-header">
          <button
            className="add-btn"
            onClick={() => navigate("/admin/dashboard/services/add")}
          >
            + Add Service
          </button>
        </div>

        <div className="services-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Service</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, index) => (
                <tr key={s._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={
                        s.photo
                          ? `https://mern-stack-backend-mlwh.onrender.com/uploads/services/${s.photo}`
                          : "/default-service.png"
                      }
                      alt="Service"
                      width="50"
                      height="50"
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </td>
                  <td>{s.name}</td>
                  <td>{s.description}</td>
                  <td>{s.duration}</td>
                  <td>{s.price}</td>
                  <td>{s.status}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/dashboard/services/edit/${s._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteService(s._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Services;