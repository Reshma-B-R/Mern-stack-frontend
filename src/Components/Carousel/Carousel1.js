import React from "react";
import image1 from "../pro_images/woman-patient-dentist4.png";
import image2 from "../pro_images/tooth_org_black2.jpg";
import "./Carousel.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "skyblue" : "gray")};
  color: white;
  padding: 10px 20px;
  border-color: rgba(0, 191, 255, 0.85);
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "rgba(0, 191, 255, 0.85)" : "darkgray"};
  }
`;

export default function Carousel1() {
  const navigate = useNavigate(); // ✅ ADD THIS

  return (
    <div>
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src={image1}
              alt="image1"
              className="d-block w-100 carousel-img"
              style={{ paddingTop: "70px" }}
            />

            <div className="centered">
              <p style={{ fontWeight: 900 }}>YOUR SMILE, OUR PRIORITY</p>

              <p style={{ color: "white", fontSize: "medium", textAlign: "justify" }}>
                We believe every smile deserves gentle and personalized care. Our
                team combines expertise with modern dental technology to ensure your
                comfort and confidence. Let us help you achieve a healthy, radiant
                smile that lasts a lifetime.
              </p>

              {/* ✅ UPDATED BUTTON */}
              <button
                type="button"
                className="btn btn-appointment ms-2"
                onClick={() => navigate("/appointment")}
              >
                Make an Appointment
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src={image2}
              alt="image2"
              className="d-block w-100 carousel-img"
              style={{ paddingTop: "70px" }}
            />

            <div className="centered">
              <p style={{ fontWeight: 900 }}>YOUR SMILE, OUR PRIORITY</p>

              <p style={{ color: "white", fontSize: "medium", textAlign: "justify" }}>
                We believe every smile deserves gentle and personalized care. Our
                team combines expertise with modern dental technology to ensure your
                comfort and confidence. Let us help you achieve a healthy, radiant
                smile that lasts a lifetime.
              </p>

              {/* ✅ UPDATED BUTTON */}
              <Button primary onClick={() => navigate("/appointment")}>
                MAKE AN APPOINTMENT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
