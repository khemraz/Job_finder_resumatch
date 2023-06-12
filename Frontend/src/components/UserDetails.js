import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { getUserDetails } from '../api/userAPI'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UserDetails = () => {
  const { id } = useParams()
  const [Userdetail, setUserdetail] = useState({})
  const [detail, setdetail] = useState([])
  const [skilldetail, setskilldetail] = useState([])
  const [experiencedetail, setexperiencedetail] = useState([])
  const navigate=useNavigate()
  useEffect(() => {
    getUserDetails(id)
      .then(data => {
        setUserdetail(data)
        setdetail(data.education)
        console.log(data)
      })
  }, [])
  // Format date to yyyy-mm-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>User Information</h1>
        <div className="row">
          <div className="col-md-6">
            <h5>Name: {Userdetail.username}</h5>
            <h5>Gender: {Userdetail.gender}</h5>
            <h5>Email: {Userdetail.email}</h5>
            <h5>Phone Number: {Userdetail.phone}</h5>
            <h5>Address: {Userdetail.location}</h5>
            <h4>Education:</h4>
            <ul>
              {detail && detail.map((item, index) => (
                <li key={index}>
                  <p>{item.school}</p>
                  <p>{item.degree}</p>
                  <p>
                    {formatDate(item.startDate)} to {formatDate(item.endDate)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <h4>Skills:</h4>
            <ul>
              {Userdetail && Userdetail.skill && Userdetail.skill.map((item) => (
                <li key={item._id}>{item.skill}</li>
              ))}
            </ul>
            <h4>Experience:</h4>
            <ul>
              {Userdetail && Userdetail.experience && Userdetail.experience.map((item, index) => (
                <li key={index}>
                  <p>{item.company}</p>
                  <p>{item.title}</p>
                  <p>
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </p>
                </li>
              ))}
            </ul>

          </div>
        </div>
        <button className='btn btn-primary' onClick={handleGoBack}>Back to List</button>
      </div>
    </div>
  )
}

export default UserDetails