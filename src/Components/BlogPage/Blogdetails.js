import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Blog.css";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

export default function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  // ✅ Comments
  const [comments, setComments] = useState([]);

  // ✅ Popup state
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Comment form
  const [commentForm, setCommentForm] = useState({
    name: "",
    message: "",
  });

  // Fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://mern-stack-backend-mlwh.onrender.com/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(`https://mern-stack-backend-mlwh.onrender.com/blogs/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [id]);

  const handleCommentChange = (e) => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentForm.name.trim() || !commentForm.message.trim()) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.post(`https://mern-stack-backend-mlwh.onrender.com/blogs/${id}/comments`, commentForm);

      // clear form
      setCommentForm({ name: "", message: "" });

      // close popup
      setShowPopup(false);

      // reload comments
      fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment!");
    }
  };

  if (!blog) return <p className="text-center mt-5">Loading blog...</p>;

  return (
    <div>
      <Navigation />

      <section className="contact-header">
        <h1>{blog.title}</h1>
      </section>

      <section className="blog-section py-5">
        <div className="container">
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
              style={{
                width: "100%",
                maxHeight: "600px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* META */}
          <div className="blog-meta mb-3">
            <span className="me-3">
              <i className="bi bi-person-fill text-info"></i> {blog.author}
            </span>

            <span className="me-3">
              <i className="bi bi-calendar3 text-info"></i> {blog.date}
            </span>

            <span>
             <i className="bi bi-chat-dots text-info"></i>{" "}
  {blog.commentCount || 0} Comments
            </span>
          </div>

          {/* CONTENT */}
          <div className="p-4 bg-white shadow-sm rounded mb-4">
            <div style={{ lineHeight: "1.8", color: "#333" }}>
              {blog.content
                .split("\n")
                .filter((para) => para.trim() !== "")
                .map((para, index) => (
                  <p key={index}>{para.trim()}</p>
                ))}
            </div>
          </div>

          {/* ================= COMMENTS ================= */}
          <div className="p-4 bg-white shadow-sm rounded">
            <div className="comment-header">
              <h3>Comments ({comments.length})</h3>

              {/* ✅ Open Popup Button */}
              <button
                className="btn btn-primary"
                onClick={() => setShowPopup(true)}
              >
                + Add Comment
              </button>
            </div>

            <hr />

            {/* SHOW COMMENTS */}
            {comments.length === 0 ? (
              <p>No comments yet. Be the first one 😊</p>
            ) : (
              comments.map((c) => (
                <div key={c._id} className="comment-box mb-3">
                  <h6 className="mb-1">{c.name}</h6>
                  <p className="mb-1">{c.message}</p>
                  <small className="text-muted">
                    {new Date(c.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ================= POPUP COMMENT BOX ================= */}
      {showPopup && (
        <div className="comment-popup-overlay">
          <div className="comment-popup">
            <h4>Add a Comment</h4>

            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={commentForm.name}
                onChange={handleCommentChange}
              />

              <textarea
                name="message"
                placeholder="Write your comment..."
                value={commentForm.message}
                onChange={handleCommentChange}
                rows="4"
              />

              <div className="popup-buttons">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}