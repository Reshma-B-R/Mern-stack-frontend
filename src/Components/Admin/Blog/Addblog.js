import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Blog.css";

const AddBlog = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    date: "",
    content: "",
    status: "Draft",
  });
  const [image, setImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("author", form.author);
      data.append("date", form.date);
      data.append("content", form.content);
      data.append("status", form.status);

      if (image) data.append("image", image);

      await axios.post("https://mern-stack-backend-mlwh.onrender.com/blogs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/dashboard/blog");
    } catch (err) {
      console.error(err);
      alert("Error adding blog!");
    }
  };

  // ✅ Logout
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
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <h2 className="mobile-logo">DentalUI</h2>
      </div>

      {/* Sidebar Overlay */}
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

            {/* Logout */}
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

      {/* Main Content */}
      <main className="main">
        <h2>Add Blog</h2>

        <form className="blog-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            rows="10"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit">Save</button>
        </form>
      </main>
    </div>
  );
};

export default AddBlog;