// import React from 'react'
// import blog1 from '../pro_images/teeth_check.jpg'
// import blog2 from '../pro_images/teeth.jpg'
// import blog3 from '../pro_images/kid_teeth.jpg'
// import './Blog.css'
// import "aos/dist/aos.css";

// export default function HomeBlog() {
//   return (
//     <section className="blog-section py-5">
//       <div className="container">

//         {/* Heading */}
//         <div className="text-center mb-5">
//           <h6 className="text-uppercase mb-2 blog-subtitle">Our Blog</h6>
//           <h2 className="fw-bold blog-title">Latest Dental Tips & Articles</h2>
//         </div>

//         {/* Blog Cards */}
//         <div className="row g-4 justify-content-center">

//           <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" data-aos="fade-right">
//             <div className="blog-card">
//               <img src={blog1} alt="Dental Blog 1" className="img-fluid blog-img" />
//               <div className="blog-content p-4">
//                 <div className="blog-meta mb-2">
//                   <span><i className="bi bi-person-fill text-info"></i> Admin</span>
//                   <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Jan 20, 2025</span>
//                   <span><i className="bi bi-chat-dots text-info"></i> 3 Comments</span>
//                 </div>
//                 <h5 className="fw-bold mb-2">How to keep your teeth always in the best condition</h5>
//                 <p className="text-muted mb-0">
//                   Discover easy dental hygiene habits to maintain a bright and healthy smile every day.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" data-aos="fade-up">
//             <div className="blog-card">
//               <img src={blog2} alt="Dental Blog 2" className="img-fluid blog-img" />
//               <div className="blog-content p-4">
//                 <div className="blog-meta mb-2">
//                   <span><i className="bi bi-person-fill text-info"></i> Admin</span>
//                   <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Jan 22, 2025</span>
//                   <span><i className="bi bi-chat-dots text-info"></i> 5 Comments</span>
//                 </div>
//                 <h5 className="fw-bold mb-2">Why regular dental checkups are important</h5>
//                 <p className="text-muted mb-0">
//                   Routine visits help detect dental problems early and ensure long-term oral health.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" data-aos="fade-left">
//             <div className="blog-card">
//               <img src={blog3} alt="Dental Blog 3" className="img-fluid blog-img" />
//               <div className="blog-content p-4">
//                 <div className="blog-meta mb-2">
//                   <span><i className="bi bi-person-fill text-info"></i> Admin</span>
//                   <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Jan 25, 2025</span>
//                   <span><i className="bi bi-chat-dots text-info"></i> 2 Comments</span>
//                 </div>
//                 <h5 className="fw-bold mb-2">Tips for overcoming dental anxiety</h5>
//                 <p className="text-muted mb-0">
//                   Feeling nervous about dental visits? Here’s how to make your experience stress-free.
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomeBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://mern-stack-backend-mlwh.onrender.com/blogs");

      // ✅ Only Published blogs
      const publishedBlogs = res.data.filter((b) => b.status === "Published");

      // ✅ Take first 3 blogs only
      setBlogs(publishedBlogs.slice(0, 3));
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  return (
    <section className="blog-section py-5">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <h6 className="text-uppercase mb-2 blog-subtitle">Our Blog</h6>
          <h2 className="fw-bold blog-title">Latest Dental Tips & Articles</h2>
        </div>

        {/* Blog Cards */}
        <div className="row g-4 justify-content-center">
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
              data-aos={
                index === 0 ? "fade-right" : index === 1 ? "fade-up" : "fade-left"
              }
            >
              <div className="blog-card">
                {/* BLOG IMAGE */}
                <img
                  src={
                    blog.image
                      ? `https://mern-stack-backend-mlwh.onrender.com/uploads/blogs/${blog.image}`
                      : "/default-blog.png"
                  }
                  alt={blog.title}
                  className="img-fluid blog-img"
                />

                <div className="blog-content p-4">
                  {/* META */}
                  <div className="blog-meta mb-2">
                    <span>
                      <i className="bi bi-person-fill text-info"></i>{" "}
                      {blog.author}
                    </span>

                    <span className="mx-2">
                      <i className="bi bi-calendar3 text-info"></i> {blog.date}
                    </span>

                    {/* ✅ COMMENTS COUNT */}
                    <span>
                      <i className="bi bi-chat-dots text-info"></i>{" "}
                      {blog.commentCount || 0} Comments
                    </span>
                  </div>

                  {/* TITLE */}
                  <h5 className="fw-bold mb-2">{blog.title}</h5>

                  {/* PREVIEW */}
                  <p className="text-muted mb-3">
                    {blog.content.length > 90
                      ? blog.content.substring(0, 90) + "..."
                      : blog.content}
                  </p>

                  {/* READ MORE */}
                  <Link to={`/blog/${blog._id}`}>
                    <button className="btn btn-info btn-sm text-white">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* EMPTY */}
          {blogs.length === 0 && (
            <p className="text-center text-muted">No blogs available</p>
          )}
        </div>

        {/* OPTIONAL: View All Blogs Button */}
        <div className="text-center mt-4">
          <Link to="/blog">
            <button className="btn btn-outline-info">View All Blogs</button>
          </Link>
        </div>
      </div>
    </section>
  );
}