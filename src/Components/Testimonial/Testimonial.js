import React from 'react';
import person1 from '../pro_images/person.jpeg';
import person2 from '../pro_images/female_person.png';
import person3 from '../pro_images/female_person2.png';
import bg from '../pro_images/kid_teeth2.jpg'; // background image
import './Testimonial.css'

export default function Testimonial() {
  return (
    <section
      className="testimonial text-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="container">

        <div className="heading white-heading">
          What Our Clients Say
        </div>

        <div
          id="testimonial4"
          className="carousel slide testimonial4_indicators testimonial4_control_button"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >

          <div className="carousel-inner">

            <div className="carousel-item active">
              <div className="testimonial4_slide">
                <img src={person1} alt="person1" className="img-circle img-responsive" />
                <p>“I had an amazing experience! The staff were friendly and the treatment was painless.”</p>
                <h4>- Michael Lee</h4>
              </div>
            </div>

            <div className="carousel-item">
              <div className="testimonial4_slide">
                <img src={person2} alt="person2" className="img-circle img-responsive" />
                <p>“I got my braces treatment done here and I’m so happy with the results. Highly recommend!”</p>
                <h4>- Sarah Johnson</h4>
              </div>
            </div>

            <div className="carousel-item">
              <div className="testimonial4_slide">
                <img src={person3} alt="person3" className="img-circle img-responsive" />
                <p>“Excellent experience! The doctors were kind, professional, and made me feel at ease.”</p>
                <h4>- Priya Sharma</h4>
              </div>
            </div>

          </div>

          {/* Carousel Controls - Bootstrap 5 */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonial4"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonial4"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>

        </div>
      </div>
    </section>
  );
}
