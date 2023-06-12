import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Form from '../components/Profile_form'
import { searchJob } from '../api/jobAPI'
import JobDetails from '../components/JobDetails'
import { Link, useParams } from 'react-router-dom'
// import '../mystyle.css'

const Search = () => {
  let [jobs, setJob] = useState([])
  let {search} = useParams()
  useEffect(() => {
    searchJob(search)
      .then((data) => {
        if (data.error) {
          console.log(data.error)

        }
        else {
            console.log(data)
          setJob(data)
        }

      })
  }, [search])

  return (
    <div>
      <Navbar />
      <div className='container container-fluid'>
      <h1 className='ms-1'>Results for {search}</h1>

      </div>
      <div className='container container-fluid d-flex flex-wrap'>
        {/* <div className='d-flex flex-wrap'> */}


        {
          jobs && jobs.map((job) => {
            return <Card job={job} />

          })
        }
        {/* <JobDetails/> */}
      </div>
      <div className='container container-fluid'>

      <Link className='btn btn-primary ms-1 'to={'/'}>Goback</Link>
    </div>
        </div>
    // </div>
  )
}

export default Search