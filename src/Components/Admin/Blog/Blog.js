import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Blog.css";

const Blog = ({ user, setUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://mern-stack-backend-mlwh.onrender.com/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await axios.delete(`https://mern-stack-backend-mlwh.onrender.com/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    }
  };

  const handleNavClick = () => setSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      {/* Mobile topbar */}
      <div className="mobile-topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
        <h2 className="mobile-logo">DentalUI</h2>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">DentalUI</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>
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
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main">
        <h2>Blog</h2>
        <div className="blog-header">
          <button className="add-btn" onClick={() => navigate("/admin/dashboard/blog/add")}>
            + Add Blog
          </button>
        </div>

        <div className="blog-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Date</th>
                <th>Title</th>
                <th>Author</th>
                <th>Content</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((b, index) => (
                <tr key={b._id}>
                  <td>{index + 1}</td>
                  <td>
                    {b.image ? (
                      <img
                        src={`https://mern-stack-backend-mlwh.onrender.com/uploads/blogs/${b.image}`}
                        alt="blog"
                        style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{b.date}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td style={{ maxWidth: "250px" }}>
                    {b.content ? b.content.substring(0, 80) + "..." : "No content"}
                  </td>
                  <td style={{ color: b.status === "Published" ? "green" : "orange", fontWeight: "bold" }}>
                    {b.status}
                  </td>
                  <td>
                    <button onClick={() => navigate(`/admin/dashboard/blog/edit/${b._id}`)}>Edit</button>
                    <button onClick={() => deleteBlog(b._id)}>Delete</button>
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

export default Blog;