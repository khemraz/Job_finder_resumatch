import React, { useEffect, useState } from 'react'
import { getAppliedByUser, getJobsByUser } from '../api/application';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../api/userAPI';
import Navbar from './Navbar';

const UserDashboard = ({userId}) => {
    // const [users, setUsers] = useState({});
  const [jobs, setJobs] = useState([]);
    const {user} = isAuthenticated()
// const {jobId}=useParams()
  useEffect(() => {
    getAppliedByUser(user._id).then((data) => {
        console.log(data)
      setJobs(data);
      
      // console.log(data)
    });

//   getJobDetails(jobId).then((data) => {
//     // console.log(data)
//   setJobs(data);})
}, [userId]);
  return (
    <div>
        <Navbar/>
        <div className='container pt-4'>
      <h2><u>Applied Jobs </u></h2>
      <table className='table table-hover text-center align-middle '>
        <thead>
          <tr>
            {/* <th>User ID</th> */}
            <th>Job title</th>
            <th>CompanyName</th>
            <th>Similarity Score</th>
            <th>Details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs && jobs.map((job) => (
            <tr key={job.job._id}>
                {/* {console.log(job)} */}
              {/* <td>{user._id}</td> */}
              <td>{job.job.title}</td>
              <td>{job.job.company.companyname}</td>
              <td>{job.similarity ? (parseFloat(job.similarity)*100).toFixed(2)+'%' : '-'}</td>
              <td><Link to={`/jobdetails/${job.job._id}`} className='btn btn-warning' >View Details</Link></td>
              <td>
                {
                  job.status===true?<><p className='text-success'>"Accepted"</p></>:job.status===false?<><p className='text-danger'>"Rejected"</p></>:<><p className='text-muted'>"Pending"</p></>
                  
                }
                
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default UserDashboard