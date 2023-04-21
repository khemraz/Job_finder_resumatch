import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated, signOut } from "../api/userAPI"

const Navbar = () => {
const {user}=isAuthenticated()
const navigate=useNavigate()
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
return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            
              <h3>ResuMatch</h3>
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><Link to="#" className="nav-link px-2 text-dark">H</Link></li>
              <li><Link to="/about" className="nav-link px-2 text-white ml-3">About Us</Link></li>
              <li><Link to="/service" className="nav-link px-2 text-white ml-3">Services</Link></li>

              


            </ul>

            {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
            </form> */}

            <div className="text-end d-flex justify-content-evenly fs-3">

              { !user && 
              <><Link to='/login' type="button" className="btn btn-outline-light me-2">Login</Link>


              <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sign Up
              </button>
              </>
              }

              {
                user && user.role===0 && 
                <Link to='/profile'>
                <i className="bi bi-person-circle mx-4 text-white"></i></Link>
              }
              {
                 user && user.role===1 && 
                 <Link to='/jobgiver'>
                 <i className="bi bi-person-circle me-2 text-white"></i></Link>
              }
              {
                user && 
                <i className="bi bi-box-arrow-right me-2 text-white " role={"button"} onClick={handleSignout}></i>
              }
              <ul class="dropdown-menu ">
                <li><a class="dropdown-item" href="/signup">Sign Up as Jobseeker</a></li>
                <li><a class="dropdown-item" href="/register">Register as a Jobgiver</a></li>
              </ul>
            </div>



          </div>
        </div>

      </header>
    </>
  )
}
export default Navbar
