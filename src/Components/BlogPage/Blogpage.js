// import React from 'react'
// import blog1 from '../pro_images/teeth_check.jpg';
// import blog2 from '../pro_images/teeth.jpg'
// import blog3 from '../pro_images/kid_teeth.jpg'
// import blog4 from '../pro_images/teeth_whitening.jpg'
// import blog5 from '../pro_images/aligner-vs-braces-.jpg'
// import blog6 from '../pro_images/tooth_pain.jpg'


// export default function Blogpage() {
//   return (
//     <div>
//         <section className="contact-header">
//     <h1>Blog</h1>
   
//   </section>

// <section className="blog-section py-5">
//   <div className="container">
//     <div className="text-center mb-5">
//       <h6 className="text-uppercase mb-2" style={{color: 'rgb(16, 112, 149)',}}>Our Blog</h6>
//       <h2 className="fw-bold" style={{color:'#023047',}}>Latest Dental Tips & Articles</h2>
//     </div>

//     <div className="row g-4">
    
//       <div className="col-md-4">
//         <div className="blog-card">
//           <img src={blog1} className="img-fluid blog-img" alt="Dental Blog 1" />
//           <div className="blog-content p-4">
//             <div className="blog-meta mb-2">
//               <span><i className="bi bi-person-fill text-info"></i> Admin</span>
//               <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Jan 20, 2025</span>
//               <span><i className="bi bi-chat-dots text-info"></i> 3 Comments</span>
//             </div>
//             <h5 className="fw-bold mb-2" style={{color:'#023047',}}>How to keep your teeth always in the best condition</h5>
//             <p className="text-muted mb-0">Discover easy dental hygiene habits to maintain a bright and healthy smile every day.</p>
//           </div>
//         </div>
//       </div>

      
//       <div className="col-md-4">
//         <div className="blog-card">
//           <img src={blog2} className="img-fluid blog-img" alt="Dental Blog 2" />
//           <div className="blog-content p-4">
//             <div className="blog-meta mb-2">
//               <span><i className="bi bi-person-fill text-info"></i> Admin</span>
//               <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Jan 22, 2025</span>
//               <span><i className="bi bi-chat-dots text-info"></i> 5 Comments</span>
//             </div>
//             <h5 className="fw-bold mb-2" style={{color:'#023047',}}>Why regular dental checkups are important</h5>
//             <p className="text-muted mb-0">Routine visits help detect dental problems early and ensure long-term oral health.</p>
//           </div>
//         </div>
//       </div>

      
//       <div className="col-md-4">
//         <div className="blog-card">
//           <img src={blog3} className="img-fluid blog-img" alt="Dental Blog 3" />
//           <div className="blog-content p-4">
//             <div className="blog-meta mb-2">
//               <span><i className="bi bi-person-fill text-info"></i> Admin</span>
//               <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Jan 25, 2025</span>
//               <span><i className="bi bi-chat-dots text-info"></i> 2 Comments</span>
//             </div>
//             <h5 className="fw-bold mb-2" style={{color:'#023047',}}>Tips for overcoming dental anxiety</h5>
//             <p className="text-muted mb-0">Feeling nervous about dental visits? Here’s how to make your experience stress-free.</p>
//           </div>
//         </div>
//       </div>

      
//       <div className="col-md-4">
//         <div className="blog-card">
//           <img src={blog4} className="img-fluid blog-img" alt="Teeth Whitening" />
//           <div className="blog-content p-4">
//             <div className="blog-meta mb-2">
//               <span><i className="bi bi-person-fill text-info"></i> Dr. Sarah</span>
//               <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Feb 02, 2025</span>
//               <span><i className="bi bi-chat-dots text-info"></i> 4 Comments</span>
//             </div>
//             <h5 className="fw-bold mb-2"style={{color:'#023047',}}>Benefits of professional teeth whitening</h5>
//             <p className="text-muted mb-0">Learn why in-office whitening is safer, faster, and more effective than home remedies.</p>
//           </div>
//         </div>
//       </div>

     
//       <div className="col-md-4">
//         <div className="blog-card">
//           <img src={blog5} className="img-fluid blog-img" alt="Invisible Aligners" />
//           <div className="blog-content p-4">
//             <div className="blog-meta mb-2">
//               <span><i className="bi bi-person-fill text-info"></i> Dr. Ravi</span>
//               <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Feb 10, 2025</span>
//               <span><i className="bi bi-chat-dots text-info"></i> 6 Comments</span>
//             </div>
//             <h5 className="fw-bold mb-2" style={{color:'#023047',}}>Invisible aligners vs traditional braces</h5>
//             <p className="text-muted mb-0">Compare the comfort, appearance, and effectiveness of invisible aligners and metal braces.</p>
//           </div>
//         </div>
//       </div>

      
//       <div className="col-md-4">
//         <div className="blog-card">
//           <img src={blog6} className="img-fluid blog-img" alt="Gum Health" />
//           <div className="blog-content p-4">
//             <div className="blog-meta mb-2">
//               <span><i className="bi bi-person-fill text-info"></i> Admin</span>
//               <span className="mx-2"><i className="bi bi-calendar3 text-info"></i> Feb 15, 2025</span>
//               <span><i className="bi bi-chat-dots text-info"></i> 3 Comments</span>
//             </div>
//             <h5 className="fw-bold mb-2" style={{color:'#023047',}}>How to prevent gum diseases effectively</h5>
//             <p className="text-muted mb-0">Understand the early signs of gum issues and practical ways to protect your oral health.</p>
//           </div>
//         </div>
//       </div>

//     </div>
//   </div>
// </section>

//     </div>
//   )
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Blog.css";
import { Link } from "react-router-dom";

export default function Blogpage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://mern-stack-backend-mlwh.onrender.com/blogs");

      // ✅ Show only Published blogs (optional)
      const publishedBlogs = res.data.filter((b) => b.status === "Published");

      setBlogs(publishedBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <section className="contact-header">
        <h1>Blog</h1>
      </section>

      {/* BLOG SECTION */}
      <section className="blog-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h6
              className="text-uppercase mb-2"
              style={{ color: "rgb(16, 112, 149)" }}
            >
              Our Blog
            </h6>

            <h2 className="fw-bold" style={{ color: "#023047" }}>
              Latest Dental Tips & Articles
            </h2>
          </div>

          <div className="row g-4">
            {blogs.map((blog) => (
              <div className="col-md-4" key={blog._id}>
                <div className="blog-card">
                  {/* BLOG IMAGE */}
                  <img
                    src={
                      blog.image
                        ? `https://mern-stack-backend-mlwh.onrender.com/uploads/blogs/${blog.image}`
                        : "/default-blog.png"
                    }
                    className="img-fluid blog-img"
                    alt={blog.title}
                  />

                  <div className="blog-content p-4">
                    {/* META */}
                    <div className="blog-meta mb-2">
                      <span>
                        <i className="bi bi-person-fill text-info"></i>{" "}
                        {blog.author}
                      </span>

                      <span className="mx-2">
                        <i className="bi bi-calendar3 text-info"></i>{" "}
                        {blog.date}
                      </span>

                      {/* ✅ COMMENT COUNT */}
                      <span>
                        <i className="bi bi-chat-dots text-info"></i>{" "}
                        {blog.commentCount || 0} Comments
                      </span>
                    </div>

                    {/* TITLE */}
                    <h5 className="fw-bold mb-2" style={{ color: "#023047" }}>
                      {blog.title}
                    </h5>

                    {/* CONTENT PREVIEW */}
                    <p className="text-muted mb-3">
                      {blog.content.length > 120
                        ? blog.content.substring(0, 120) + "..."
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

            {/* EMPTY MESSAGE */}
            {blogs.length === 0 && (
              <p className="text-center text-muted">No blogs available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}