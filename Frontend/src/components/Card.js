import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({ job,setJobId }) => {
 //   console.log(job)
 //   console.log(job)

    return (
        <div>
          <Link to={`/jobdetails/${job._id}`} className='text-decoration-none'>
            <div className="card m-2 mt-2">
                <div className="card-body" onClick={setJobId}>

                    <h5 className="card-title">{job.title}</h5>
                    {job.company && job.company.companyname &&
                        <h6 className="card-subtitle mb-2 text-muted">{job.company.companyname}</h6>
                    }
                    <p className="card-text text-dark"><i class="bi bi-geo-alt"></i>{job.location}</p>
                    </div>
                </div>
                </Link>
            </div>
    )
}

export default Card