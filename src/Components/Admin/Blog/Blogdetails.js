import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Blog.css";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`https://mern-stack-backend-mlwh.onrender.com//blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  if (!blog) {
    return <p className="text-center mt-5">Loading blog...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <section className="contact-header">
        <h1>{blog.title}</h1>
      </section>

      {/* BLOG DETAILS */}
      <section className="blog-section py-5">
        <div className="container">

          {/* BACK BUTTON */}
          <Link to="/blog" className="btn btn-secondary mb-4">
            ← Back to Blog
          </Link>

          {/* IMAGE */}
          <div className="mb-4">
            <img
              src={
                blog.image
                  ? `https://mern-stack-backend-mlwh.onrender.com/uploads/blogs/${blog.image}`
                  : "/default-blog.png"
              }
              alt={blog.title}
              className="img-fluid rounded"
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

          {/* META INFO */}
          <div className="blog-meta mb-3">
            <span className="me-3">
              <i className="bi bi-person-fill text-info"></i> {blog.author}
            </span>

            <span className="me-3">
              <i className="bi bi-calendar3 text-info"></i> {blog.date}
            </span>

            <span>
              <i className="bi bi-tag-fill text-info"></i> {blog.status}
            </span>
          </div>

          {/* CONTENT */}
          <div className="p-4 bg-white shadow-sm rounded">
            <p style={{ lineHeight: "1.8", color: "#333" }}>{blog.content}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
