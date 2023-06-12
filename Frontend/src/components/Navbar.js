import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated, signOut } from "../api/userAPI"
import image from '../45760194.jpg'
const Navbar = () => {
const {user}=isAuthenticated()
const navigate=useNavigate()
let [search, setSearch] = useState('')
const handleSignout=()=>{
  signOut()
  .then(data=>{
      if(data.error){
          console.log(data.error)
      }
      else{
          console.log(data.message)
          navigate('/')
      }
  })
}
const handleSearch = e => {
  // localStorage.setItem("search",e.target.value)
  setSearch(e.target.value)
}

const gotoSearch = e => {
  e.preventDefault()
  navigate(`/search/${search}`)
}
return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src={image} style={{height:"50px"}} className="me-2"/>
              <h3>ResuMatch</h3>
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="#" className="nav-link px-2 text-dark">H</Link></li>
              <li><Link to="/about" className="nav-link px-2 text-white ml-3">About Us</Link></li>
              <li><Link to="/service" className="nav-link px-2 text-white ml-3">Services</Link></li>

              


            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 btn-group" role="search">
              <input type="search" className="form-control form-control-dark text-bg-light" placeholder="Search..." aria-label="Search" onChange={handleSearch}
              />
              <button onClick={gotoSearch} className="btn btn-secondary"><i className="bi bi-search"></i></button>
            </form>

            <div className="text-end d-flex justify-content-evenly fs-3">

              { !user && 
              <><Link to='/login' type="button" className="btn btn-outline-light me-2">Login</Link>


              <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sign Up
              </button>
              </>
              }
              {
                user && user.role===0 && 
                <Link to='/userdashboard'>
                <i className="bi bi-speedometer mx-4 text-white"></i></Link>
                
              }
              {
                user && user.role===0 && 
                <Link to='/profile'>
                <i className="bi bi-person-circle me-4 text-white"></i></Link>
                
              }
              
              {
                 user && user.role===1 && 
                 <Link to='/jobgiver'>
                 <i className="bi bi-person-circle me-4 text-white"></i></Link>
              }
              {
                user && 
                <i className="bi bi-box-arrow-right me-2 text-white " role={"button"} onClick={handleSignout}></i>
              }
              <ul className="dropdown-menu ">
                <li><a className="dropdown-item" href="/signup">Sign Up as Jobseeker</a></li>
                <li><a className="dropdown-item" href="/register">Register as a Jobgiver</a></li>
              </ul>
            </div>



          </div>
        </div>

      </header>
    </>
  )
}
export default Navbar
