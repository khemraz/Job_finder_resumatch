import React, { useEffect, useState } from 'react'
import JobPostingForm from '../components/JobPostingForm'
import Navbar from '../components/Navbar'
import { getJobDetailsByCompany } from '../api/jobAPI'
import { isAuthenticated } from '../api/userAPI'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

const CompanyProfile = () => {
  let [jobs,setJob]=useState([])
let {user}=isAuthenticated()
 useEffect(()=>{
  getJobDetailsByCompany(user._id)
  .then((data)=>{
if(data.error){
  console.log(data.error)

}
else{
  setJob(data)
}

  })
 },[])

  return (
    <div>
        <Navbar/>
        {
         jobs&& jobs.map((job)=>{
            return <Card job={job}></Card>
          })
        }
        <Link to='/jobpost' className='btn btn-warning m-4'>Post a new job</Link>
        {/* <JobPostingForm/> */}
    </div>
  )
}

export default CompanyProfile