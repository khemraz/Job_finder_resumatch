import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({ job,setJobId }) => {
 //   console.log(job)
 //   console.log(job)

    return (
        <div>
            <div className='card-container'>
          <Link to={`/jobdetails/${job._id}`} className='text-decoration-none text-dark'>
            <div className='container '>
            <div className="card mt-2">
                <div className="card-body " onClick={setJobId}>

                    <h5 className="card-title">{job.title}</h5>
                    {job.company && job.company.companyname &&
                        <h6 className="card-subtitle mb-2 text-primary">{job.company.companyname}</h6>
                    }
                    <p className="card-text text-muted"><i class="bi bi-geo-alt"></i>{job.location}</p>
                    </div>
                </div>
                </div>
                </Link>
                </div>
            </div>
    )
}

export default Card