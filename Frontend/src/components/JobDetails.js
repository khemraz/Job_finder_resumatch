import React, { useEffect, useState } from 'react'
import { getJobDetails } from '../api/jobAPI'
import { isAuthenticated } from '../api/userAPI'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { Apply } from '../api/application'
import Swal from 'sweetalert2'

const JobDetails = () => {

  let [jobs, setJob] = useState([])
  let { id } = useParams()
  let { user } = isAuthenticated()
  useEffect(() => {
    getJobDetails(id)
      .then((data) => {
        if (data.error) {
          console.log(data.error)

        }
        else {
          console.log(data)
          setJob(data)
        }

      })
  }, [])
  const handleApply = (e) => {
    e.preventDefault()
    Apply(user._id, id)
      .then(data => {
        console.log(data)
        if (data.error) {
          Swal.fire('Error',data.error,"error")
        }
        else {
          Swal.fire('Success:',"Job Applied Successfully","success")
          
        }

      })
  }

  return (

    <div>
      <Navbar />
      <div class="container">
        <h1>{jobs.company && jobs.company.companyname}</h1>
        <hr />
        <h3><strong>Title:</strong>{jobs.title}</h3>

        <h4><strong>Location:</strong> {jobs.location}</h4>
        <h4><strong>Deadline:</strong> {jobs.deadline}</h4>
        <h4><strong>Experience:</strong> {jobs.experience}</h4>
        <h4><strong>Education:</strong> {jobs.education}</h4>

        {/* <ul class="list-group">
          <li class="list-group-item"><strong>Education:</strong></li>
          {jobs && jobs.education &&jobs.education.map((edu) => (
            <li class="list-group-item">{edu}</li>
          ))}
        </ul> */}
        {/* <ul class="list-group">
          <li class="list-group-item"><strong>Skills:</strong></li>
          {jobs.skills.map((skill) => (
            <li class="list-group-item">{skill}</li>
          ))}
        </ul> */}
        <h4><strong>Description:</strong></h4>
        <ul>
          {jobs && jobs.description && jobs.description.map((desc) => (
            <li><h5>{desc}</h5></li>
          ))}
        </ul>
        {
          user && user.role == 0 &&
          <button className='btn btn-warning' onClick={handleApply}>Apply</button>
        }
      </div>


    </div>
  )
}

export default JobDetails