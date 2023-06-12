import React from 'react'
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import './mystyle.css'
import CompanyEmailConfirmation from './pages/CompanyEmailCofirmation'
import CompanyProfile from './pages/CompanyProfile'
import EmailConfirmation from './pages/EmailConfirmation'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Signup from './pages/Signup'
import JobDetails from './components/JobDetails'
import Form from './components/Profile_form'
import JobPostingForm from './components/JobPostingForm'
import About from './pages/About'
import Service from './pages/Service'
import AppliedUserList from './components/AppliedTable'
import UserDetails from './components/UserDetails'
import UserDashboard from './components/UserDashboard'
import Search from './pages/Search'
import UserRoute from './components/UserRoute'

const Myroutes = () => {
  return (
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<Home/>}/>
    <Route path='/' element={<UserRoute/>}>
    <Route path='profile' element={<Profile/>}/>
    <Route path='updateresume' element={<Form/>}/>
    <Route path='userdashboard' element={<UserDashboard/>}/>
    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/register' element={<Register/>}/>
    
    <Route path='/emailverification/:token' element={<EmailConfirmation/>}/>
    <Route path='/companyemailverification/:token' element={<CompanyEmailConfirmation/>}/>
    
    <Route path='/userdetails/:id' element={<UserDetails/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/service' element={<Service/>}/>
    
        {/* <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/resetpassword/:token' element={<ResetPassword/>}/> */}
        
    <Route path='/jobgiver' element={<CompanyProfile/>}/>
    <Route path='/jobpost' element={<JobPostingForm/>}/>

        {/* <Route path='/userbyjob/:jobId' element={<AppliedUserList/>}/> */}
     {/* //job */}
     <Route path='/jobdetails/:id' element={<JobDetails/>}/>
     <Route path='/search/:search' element={<Search/>}/> 
    
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default Myroutes