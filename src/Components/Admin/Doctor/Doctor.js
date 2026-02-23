import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Doctor.css";

const Doctors = ({ user, setUser }) => {
  const [doctors, setDoctors] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/Admin/login", { replace: true });
  };

  /* ================= FETCH DOCTORS ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Admin/login");
      return;
    }

    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "https://mern-stack-backend-mlwh.onrender.com/doctors",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDoctors(res.data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/Admin/login", { replace: true });
        }
      }
    };

    fetchDoctors();
  }, [navigate, setUser]);

  /* ================= DELETE DOCTOR ================= */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(
          `https://mern-stack-backend-mlwh.onrender.com/doctors/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDoctors(doctors.filter((doc) => doc._id !== id));
      } catch (err) {
        console.error(err);
      }
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

      {/* ===== MAIN CONTENT ===== */}
      <main className="main">
        <h2>Doctors</h2>

        <div className="doctors-header">
          <Link to="/Admin/dashboard/add-doctor">
            <button className="add-btn">+ Add Doctor</button>
          </Link>
        </div>

        <div className="doctors-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Doctor Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc, index) => (
                <tr key={doc._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={`https://mern-stack-backend-mlwh.onrender.com/uploads/doctors/${doc.photo}`}
                      alt={doc.name}
                      width="50"
                      height="50"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </td>

                  <td>{doc.name}</td>
                  <td>{doc.email}</td>
                  <td>{doc.specialization}</td>
                  <td>{doc.experience}</td>
                  <td>{doc.phone}</td>

                  <td
                    style={{
                      color:
                        doc.status === "Available"
                          ? "green"
                          : "orange",
                    }}
                  >
                    {doc.status}
                  </td>

                  <td>
                    <Link to={`/Admin/dashboard/edit-doctor/${doc._id}`}>
                      <button>Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(doc._id)}
                    >
                      Remove
                    </button>
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

export default Doctors;