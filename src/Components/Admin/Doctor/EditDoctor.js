import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Doctor.css";

const EditDoctor = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    phone: "",
    status: "Available",
    photo: "",
  });

  const [newPhoto, setNewPhoto] = useState(null);

  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  /* ===== FETCH DOCTOR ===== */
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`https://mern-stack-backend-mlwh.onrender.com/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(doctor).forEach((key) => {
        if (key !== "photo") {
          formData.append(key, doctor[key]);
        }
      });

      if (newPhoto) {
        formData.append("photo", newPhoto);
      }

      await axios.put(
        `https://mern-stack-backend-mlwh.onrender.com//doctors/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Doctor updated successfully!");
      navigate("/Admin/dashboard/doctors");
    } catch (err) {
      console.error(err);
      alert("Error updating doctor");
    }
  };

  return (
    <div className="dashboard-layout">
      {/* ===== SIDEBAR ===== */}
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
              <NavLink to="/Admin/dashboard/Patients">
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
          </ul>
        </nav>

        {/* LOGOUT */}
        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="main">
        <h2>Edit Doctor</h2>

        <form className="doctor-form" onSubmit={handleSubmit}>
          <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
          <input type="email" name="email" value={doctor.email} onChange={handleChange} required />
          <input type="text" name="specialization" value={doctor.specialization} onChange={handleChange} required />
          <input type="text" name="experience" value={doctor.experience} onChange={handleChange} required />
          <input type="text" name="phone" value={doctor.phone} onChange={handleChange} required />

          {doctor.photo && (
            <img
              src={`https://mern-stack-backend-mlwh.onrender.com//uploads/doctors/${doctor.photo}`}
              alt="Doctor"
              width="80"
              height="80"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          )}

          <input type="file" accept="image/*" onChange={handlePhotoChange} />

          <select name="status" value={doctor.status} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="On Leave">On Leave</option>
          </select>

          <button type="submit" className="add-btn">
            Update Doctor
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditDoctor;