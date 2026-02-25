import { useState,useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import Register from './Components/Admin/Register';
import Login from './Components/Admin/Login';
import Dashboard from './Components/Admin/dashboard';
import Home from './Pages/home';
import About from './Pages/About';
import Doctors from './Pages/Doctors';
import Services from './Pages/Services';
import Blog from './Pages/Blog';
import Contact from './Pages/Contact';
import Appointment from './Pages/Appointment';
import Appointments from './Components/Admin/Appointment/Appointment'
import Patient from './Components/Admin/Patient/Patient';
import Doctor from './Components/Admin/Doctor/Doctor';
import Service from './Components/Admin/Service/Service';
import EditAppointment from './Components/Admin/Appointment/EditAppointment';
import Blogs from './Components/Admin/Blog/Blog';
import EditDoctor from './Components/Admin/Doctor/EditDoctor';
import AddDoctor from './Components/Admin/Doctor/AddDoctor';
import AddService from './Components/Admin/Service/AddService';
import EditService from './Components/Admin/Service/EditService';
import AddBlog from './Components/Admin/Blog/Addblog';
import EditBlog from './Components/Admin/Blog/EditBlog';
import Report from './Components/Admin/Report/Report';
import AddReport from './Components/Admin/Report/AddReport';

import BlogDetails from './Components/BlogPage/Blogdetails';

const App = () => {
  const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);
    //check token page refresh
    useEffect(()=>{
      const token=localStorage.getItem("token");
  
      if(!token){
        setLoading(false);
        return;
      }
      fetch("https://mern-stack-backend-mlwh.onrender.com/auth/user",{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      })
      .then((res)=>res.json())
      .then((data)=>{
        if(data?.App_id){
          setUser(data);
        }else{
          localStorage.removeItem("token");
        }
      })
      .catch(()=>{
         localStorage.removeItem("token");
  
      })
      .finally(()=>setLoading(false));
    },[]);
    
    //prevent route flicker
    if(loading){
      return <p>loading...</p>;
    }
  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/about" element={<About/>}/>
          <Route path="/doctors" element={<Doctors/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/blog" element={<Blog/>}/>
           <Route path="/contact" element={<Contact/>}/>
           <Route path="/appointment" element={<Appointment />}/>
           {/* login */}
                 <Route path="/admin" element={user? (<Navigate to="/admin/dashboard"/>):(<Login setUser={setUser}/>)} />
                 {/* <Route path="/" element={<Register />} /> */}
                 {/* login route */}
                 <Route path="/admin/login" element={user?(<Navigate to="/admin/dashboard"/> ):(<Login setUser={setUser}/>)}/>
                  {/* Register */}
                 <Route path="/admin/register" element={<Register/>} />
                  {/* <Route path="/Admin/dashboard" element={user?(<Dashboard user={user} setUser={setUser}/>):(<Navigate to="/Admin/login"/>)} /> */}
                  <Route path="/admin/dashboard" element={<Dashboard user={user} setUser={setUser} />}/>

                   <Route path="/admin/dashboard/Appointment" element={<Appointments user={user} setUser={setUser} />}/>
                  <Route path="/admin/dashboard/patients" element={<Patient user={user} setUser={setUser}/>}/>
                 <Route path="/admin/dashboard/doctors" element={<Doctor user={user} setUser={setUser} />}/>
                  <Route path="/admin/dashboard/services" element={<Service user={user}  setUser={setUser}/>}/>
          
                <Route path="/admin/dashboard/Appointment/edit/:id" element={<EditAppointment user={user} setUser={setUser}/>}/>
                <Route path="/admin/dashboard/blog" element={<Blogs user={user} setUser={setUser}/>} />

               <Route
          path="/admin/dashboard/edit-doctor/:id"
          element={<EditDoctor  user={user} setUser={setUser} />}
        />
         <Route path="/admin/dashboard/add-doctor" element={<AddDoctor  user={user} setUser={setUser}  />} />  
         <Route path="/admin/dashboard/services/add" element={<AddService  user={user} setUser={setUser} />} />
<Route path="/admin/dashboard/services/edit/:id" element={<EditService  user={user} setUser={setUser} />} />


  <Route
    path="/admin/dashboard/blog/add"
    element={<AddBlog  user={user} setUser={setUser} />}
  />

  <Route
    path="/admin/dashboard/blog/edit/:id"
    element={<EditBlog  user={user} setUser={setUser} />}
  />
  <Route
  path="/admin/dashboard/reports"
  element={<Report user={user} setUser={setUser}/>}
/>
<Route
  path="/admin/dashboard/reports/add"
  element={<AddReport  user={user} setUser={setUser} />}
/>

<Route path="/blog/:id" element={<BlogDetails />} />

      </Routes>
    </Router>
      
    </>
  );
}

export default App;
