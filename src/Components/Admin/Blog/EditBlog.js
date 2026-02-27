import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Blog.css";

const EditBlog = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    date: "",
    content: "",
    status: "Draft",
    image: "",
  });

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`https://mern-stack-backend-mlwh.onrender.com/blogs/${id}`);
      setForm(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load blog!");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
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

      // only send new image if selected
      if (newImage) data.append("image", newImage);

      await axios.put(`https://mern-stack-backend-mlwh.onrender.com/blogs/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog updated successfully!");
      navigate("/admin/dashboard/blog");
    } catch (err) {
      console.log(err);
      alert("Error updating blog!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">DentalUI</h2>
        <nav>
          <p className="menu-title">MENU</p>
          <ul>
            <li><NavLink to="/admin/dashboard" end>Dashboard</NavLink></li>
            <li><NavLink to="/admin/dashboard/Appointment">Appointments</NavLink></li>
            <li><NavLink to="/admin/dashboard/patients">Patients</NavLink></li>
            <li><NavLink to="/admin/dashboard/doctors">Doctors</NavLink></li>
            <li><NavLink to="/admin/dashboard/services">Services</NavLink></li>
            <li><NavLink to="/admin/dashboard/blog">Blog</NavLink></li>
            <li><NavLink to="/admin/dashboard/reports">Reports</NavLink></li>
          </ul>
        </nav>
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <h2>Edit Blog</h2>

        <form className="blog-form" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title || ""}
            onChange={handleChange}
            required
          />

          <input
            name="author"
            placeholder="Author"
            value={form.author || ""}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date || ""}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            placeholder="Content"
            value={form.content || ""}
            onChange={handleChange}
            rows="5"
            required
          />

          <select
            name="status"
            value={form.status || "Draft"}
            onChange={handleChange}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

          {/* Current Image */}
          {form.image && (
            <div style={{ marginTop: "10px" }}>
              <p style={{ marginBottom: "6px", fontWeight: "bold" }}>
                Current Image:
              </p>
              <img
                src={`https://mern-stack-backend-mlwh.onrender.com/uploads/blogs/${form.image}`}
                alt="Blog"
                style={{
                  width: "200px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          )}

          {/* New Image */}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div style={{ marginTop: "15px" }}>
            <button type="submit" className="save-btn">Update Blog</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/dashboard/blog")}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditBlog;