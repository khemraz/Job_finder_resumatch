import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Form from '../components/Profile_form'
import { getAllJob } from '../api/jobAPI'
import JobDetails from '../components/JobDetails'
// import '../mystyle.css'

const Home = () => {
  let [jobs, setJob] = useState([])

  useEffect(() => {
    getAllJob()
      .then((data) => {
        if (data.error) {
          console.log(data.error)

        }
        else {
          setJob(data)
        }

      })
  }, [])

  return (
    <div>
      <Navbar />
      <div className='container container-fluid d-flex flex-wrap'>
        {/* <div className='d-flex flex-wrap'> */}


        {
          jobs && jobs.map((job) => {
            return <Card job={job} />

          })
        }
        {/* <JobDetails/> */}
      </div>
    </div>

    // </div>
  )
}

export default Home