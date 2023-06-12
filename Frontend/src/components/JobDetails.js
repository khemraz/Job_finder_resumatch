  import React, { useEffect, useState } from 'react'
  import { deleteJob, getJobDetails, updateJob } from '../api/jobAPI'
  import { isAuthenticated } from '../api/userAPI'
  import { Navigate, useNavigate, useParams } from 'react-router-dom'
  import Navbar from './Navbar'
  import { Apply } from '../api/application'
  import Swal from 'sweetalert2'
  import AppliedUserList from './AppliedTable'

  const JobDetails = () => {

    let [jobs, setJob] = useState([])
    let { id } = useParams()
    let { user } = isAuthenticated()
    let navigate = useNavigate()
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
            Swal.fire('Error', data.error, "error")
          }
          else {
            Swal.fire('Success:', "Job Applied Successfully", "success")
            
          }

        })
    }
    const handleUpdate  = (e) => {
      e.preventDefault()
      updateJob()
        .then(data => {
          console.log(data)
          if (data.error) {
            Swal.fire('Error', data.error, "error")
          }
          else {
            Swal.fire('Success:', "Job Applied Successfully", "success")

          }

        })
    }
    const handleDelete =id=> (e) => {
      e.preventDefault()
      Swal.fire({
        title:"Confirm Delete",
        text:"Are you sure?",
        icon:"question",
      showCancelButton:true})
      .then(result=>{
        if(result.isConfirmed){
          deleteJob(id)
        .then(data => {
          console.log(data)
          if (data.error) {
            Swal.fire('Error', data.error, "error")
          }
          else {
            Swal.fire('Success:', "Job Deleted Successfully", "success").then(() => {
              navigate('/jobgiver');
            })
            // Swal.fire('Success:', "Job Deleted Successfully", "success")
            // navigate('/jobgiver')

          }
        })
        }
      })
      
    }
    // Format date to yyyy-mm-dd
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    return (

      <div>
        <Navbar />
        <div class="container">
          <h1>{jobs.company && jobs.company.companyname}</h1>
          <hr />
          <h3><strong>Title:</strong>{jobs.title}</h3>

          <h4><strong>Location:</strong> {jobs.location}</h4>
          <h4><strong>Deadline:</strong> {formatDate(jobs.deadline)}</h4>
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
          {/* {
            user && user.role == 1 && jobs.company && user._id == jobs.company._id &&
            <button className='btn btn-warning' onClick={handleUpdate}>Update Job</button>

          } */}
          {
            user && user.role == 1 && jobs.company && user._id == jobs.company._id &&
            <button className='btn btn-danger ms-2' onClick={handleDelete(jobs._id)}>Delete Job</button>

          } 

        </div>
        {
          user && user.role == 1 && jobs.company && user._id == jobs.company._id &&
          <AppliedUserList jobId={id} title={jobs.title} />
        }
      </div>
    )
  }

  export default JobDetails

    // import React, { useEffect, useState } from 'react'
  // import { getJobDetails, updateJob } from '../api/jobAPI'
  // import { isAuthenticated } from '../api/userAPI'
  // import { useParams } from 'react-router-dom'
  // import Navbar from './Navbar'
  // import { Apply } from '../api/application'
  // import Swal from 'sweetalert2'
  // import AppliedUserList from './AppliedTable'

  // const JobDetails = () => {
  //   let [jobs, setJob] = useState([])
  //   let { id } = useParams()
  //   let { user } = isAuthenticated()
  //   let [showJobDetails, setShowJobDetails] = useState(false)
  //   let [showAppliedList, setShowAppliedList] = useState(true)

  //   useEffect(() => {
  //     getJobDetails(id)
  //       .then((data) => {
  //         if (data.error) {
  //           console.log(data.error)
  //         } else {
  //           console.log(data)
  //           setJob(data)
  //         }
  //       })
  //   }, [])

  //   const handleApply = (e) => {
  //     e.preventDefault()
  //     Apply(user._id, id)
  //       .then(data => {
  //         console.log(data)
  //         if (data.error) {
  //           Swal.fire('Error', data.error, "error")
  //         } else {
  //           Swal.fire('Success:', "Job Applied Successfully", "success")
  //         }
  //       })
  //   }

  //   const handleUpdate = (e) => {
  //     e.preventDefault()
  //     updateJob()
  //       .then(data => {
  //         console.log(data)
  //         if (data.error) {
  //           Swal.fire('Error', data.error, "error")
  //         } else {
  //           Swal.fire('Success:', "Job Applied Successfully", "success")
  //         }
  //       })
  //   }

  //   // Format date to yyyy-mm-dd
  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     const year = date.getFullYear();
  //     const month = String(date.getMonth() + 1).padStart(2, '0');
  //     const day = String(date.getDate()).padStart(2, '0');
  //     return `${year}-${month}-${day}`;
  //   };

  //   const handleToggleJobDetails = () => {
  //     setShowJobDetails(true);
  //     setShowAppliedList(false);
  //   }

  //   const handleToggleAppliedList = () => {
  //     setShowJobDetails(false);
  //     setShowAppliedList(true);
  //   }

  //   return (
  //     <div>
  //       <Navbar />
  //       <div className="container">

  //         {showJobDetails && (
  //           <div>
  //             <h1>{jobs.company && jobs.company.companyname}</h1>
  //             <hr />
  //             <h3><strong>Title:</strong>{jobs.title}</h3>
  //             <h4><strong>Location:</strong> {jobs.location}</h4>
  //             <h4><strong>Deadline:</strong> {formatDate(jobs.deadline)}</h4>
  //             <h4><strong>Experience:</strong> {jobs.experience}</h4>
  //             <h4><strong>Education:</strong> {jobs.education}</h4>
  //             <h4><strong>Description:</strong></h4>
  //             <ul>
  //               {jobs && jobs.description && jobs.description.map((desc, index) => (
  //                 <li key={index}><h5>{desc}</h5></li>
  //                 ))}
  //               </ul>
  //               {user && user.role === 0 && (
  //                 <button className='btn btn-warning' onClick={handleApply}>Apply</button>
  //               )}
  //             </div>
  //           )}

  //           {showAppliedList && user && user.role === 1 && jobs.company && user._id === jobs.company._id && (
  //             <AppliedUserList jobId={id} title={jobs.title}/>
  //           )}

  //           <div className="toggle-buttons">
  //           <button className={`btn ${showJobDetails ? 'btn-primary me-4' : 'btn-secondary me-4'}`} onClick={handleToggleJobDetails}>Job Details</button>
  //           <button className={`btn ${showAppliedList ? 'btn-primary' : 'btn-secondary'}`} onClick={handleToggleAppliedList}>Applied List</button>
  //         </div>



  //         </div>
  //       </div>
  //     )
  //   }

  //   export default JobDetails