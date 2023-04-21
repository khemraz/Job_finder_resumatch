import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>

<div className="container">
  <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
    <div className="col mb-3">
      <Link to="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
        
      </Link>
      <p className="text-muted">&copy; 2022 Company, Inc</p>
    </div>

    <div className="col mb-3">
    <ul className="nav col-md-6 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><Link className="text-muted" to="#">
   
        <i className='bi bi-twitter'></i>
        </Link></li>
      <li className="ms-3"><Link className="text-muted" to="#">
        
        <i className='bi bi-instagram'></i>
        </Link></li>
      <li className="ms-3"><Link className="text-muted" to="#">
      
        <i className='bi bi-facebook'></i>
        </Link></li>
        
    </ul>
    </div>
    

    <div className="col mb-3">
      <h5>FOR JOBSEEKER</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="/register" className="nav-link p-0 text-muted">REGISTER AS Jobgiver</Link></li>
        <li className="nav-item mb-2"><Link to="/signup" className="nav-link p-0 text-muted">REGISTER AS Jobseeker</Link></li>

        <li className="nav-item mb-2"><Link to="/login" className="nav-link p-0 text-muted">LOGIN</Link></li>
       
      </ul>
    </div>

    <div className="col mb-3">
      <h5>ABOUT US</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">About ResuMatch</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">Twitter</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">Instagram</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">Facebook</Link></li>

      </ul>
    </div>

    <div className="col mb-3">
      <h5>CONTACT US</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">New Baneshwor, Kathmandu Nepal</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">+977 014244348</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-muted">Email : info@resumatch.com</Link></li>

      </ul>
    </div>
  </footer>
</div>
    </>
  )
}

export default Footer