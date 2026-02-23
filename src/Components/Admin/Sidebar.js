import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setUser }) => {
  const navigate = useNavigate();

  // ✅ Close sidebar after clicking menu item (mobile)
  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/Admin/login", { replace: true });
  };

  return (
    <>
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

          {/* Close button only on mobile */}
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
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
                to="/Admin/dashboard/patients"
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
              <button type="button" className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
