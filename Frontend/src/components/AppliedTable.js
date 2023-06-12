import React, { useEffect, useState } from 'react';
import { getAllapplies, getAppliedByJob, getUsersByJob, updateStatus } from '../api/application';
import { Link, useParams } from 'react-router-dom';
import { getJobDetails } from '../api/jobAPI';

const AppliedUserList = ({jobId,title}) => {
  const [applies, setApplies] = useState([]);
  const [success,setSuccess] = useState(false);

// const {jobId}=useParams()
  useEffect(() => {
    
    //getUsersByJob(jobId)
    getAppliedByJob(jobId).then((data) => {
        console.log(data)
      setApplies(data);
      
      // console.log(data)
    });
  }, [jobId,success]);
const handleUpdate=(userId,status)=>e=>{
  e.preventDefault()
  setSuccess(false)
  console.log(userId)
  
  updateStatus(userId,jobId,status)
  .then(data=>{
    // console.log(data)
    if(data.error){
      console.log(data.error)
      }
      else{
        setSuccess(true)
      }
    
  })
}
  return (
    <div className='container pt-4'>
      
      <h2><u>Users who applied for Job {title}</u></h2>
      <table className='table table-hover text-center align-middle '>
        <thead>
          <tr>
            {/* <th>User ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Similarity Score</th>
            <th>Details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applies && applies.map((user) => (
            <tr key={user._id}>{console.log(user)}
              {/* <td>{user._id}</td> */}
              <td>{user.user.username}</td>
              <td>{user.user.email}</td>
              <td>{user.similarity ? (parseFloat(user.similarity)*100).toFixed(2)+'%' : '-'}</td>
              <td><Link to={`/userdetails/${user.user._id}`} className='btn btn-secondary' >View Details</Link></td>
              <td>
                {
                  user.status===true?<><p className='text-success'>"Accepted"</p></>:user.status===false?<><p className='text-danger'>"Rejected"</p></>:<> <button className='btn btn-success me-2' onClick={handleUpdate(user.user._id,true)}><i class="bi bi-check"></i></button>
                  <button className='btn btn-danger' onClick={handleUpdate(user.user._id,false)}><i class="bi bi-x"></i></button></>
                }
                
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedUserList;
