import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Service.css";

const EditService = ({ user, setUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    status: "Available",
    photo: "",
  });

  const [newPhoto, setNewPhoto] = useState(null);

  /* ================= LOGOUT (Same as Services.js) ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/Admin/login", { replace: true });
  };

  /* ================= FETCH SERVICE ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Admin/login", { replace: true });
      return;
    }

    axios
      .get(`https://mern-stack-backend-mlwh.onrender.com/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.error(err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/Admin/login", { replace: true });
        }
      });
  }, [id, navigate, setUser]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("duration", form.duration);
      formData.append("price", form.price);
      formData.append("status", form.status);

      if (newPhoto) {
        formData.append("photo", newPhoto);
      }

      await axios.put(
        `https://mern-stack-backend-mlwh.onrender.com/services/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Service updated successfully!");
      navigate("/Admin/dashboard/services");
    } catch (err) {
      console.error(err);
      alert("Failed to update service");
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">DentalUI</h2>
        <nav>
          <p className="menu-title">MENU</p>
          <ul>
            <li>
              <NavLink to="/Admin/dashboard" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/Admin/dashboard/Appointment">
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink to="/Admin/dashboard/patients">
                Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="/Admin/dashboard/doctors">
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/Admin/dashboard/services">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/Admin/dashboard/blog">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/Admin/dashboard/reports">
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
        <h2>Edit Service</h2>

        <form className="service-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Service Name"
            required
          />

          <input
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            placeholder="Description"
            required
          />

          <input
            name="duration"
            value={form.duration || ""}
            onChange={handleChange}
            placeholder="Duration"
            required
          />

          <input
            name="price"
            value={form.price || ""}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <select
            name="status"
            value={form.status || ""}
            onChange={handleChange}
          >
            <option>Available</option>
            <option>Unavailable</option>
          </select>

          {/* Current Photo Preview */}
          {form.photo && (
            <div style={{ marginTop: "10px" }}>
              <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                Current Photo:
              </p>
              <img
                src={`https://mern-stack-backend-mlwh.onrender.com/uploads/services/${form.photo}`}
                alt="Service"
                className="service-photo-preview"
              />
            </div>
          )}

          {/* Upload New Photo */}
          <input type="file" accept="image/*" onChange={handlePhotoChange} />

          <div style={{ marginTop: "15px" }}>
            <button type="submit" className="add-btn">
              Update Service
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate("/Admin/dashboard/services")
              }
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

export default EditService;