import React from 'react'
import Navigation from '../Components/Navigation/Navigation'
// import Carousel from '../Components/Carousel/Carousel'
// import Home_about from '../Components/Home_about/Home_about'
import HomeService from '../Components/HomeService/HomeService'
import WorkHour from '../Components/WorkHours/WorkHour'
import HomeDoctor from '../Components/Doctor/HomeDoctor'
import Testimonial from '../Components/Testimonial/Testimonial'
import HomeBlog from '../Components/HomeBlog/HomeBlog'
import Footer from '../Components/Footer/Footer'
import Carousel1 from '../Components/Carousel/Carousel1'
import HomeAbout from '../Components/Home_about/HomeAbout'
export default function Home() {
  return (
    <div>
        <Navigation />
      
        <Carousel1/>
        <HomeAbout/>
        <HomeService />
        <WorkHour />
        <HomeDoctor />
        <Testimonial />
        <HomeBlog/>
        <Footer/>
    </div>
  )
}


