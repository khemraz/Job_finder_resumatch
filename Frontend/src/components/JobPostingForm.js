import React, { useState } from 'react';
import { addJob } from '../api/jobAPI';
import { isAuthenticated } from '../api/userAPI';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function JobPostingForm() {
  const {user}=isAuthenticated()
const navigate=useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    deadline: '',
    experience: '',
    education: '',
    description: [],
    company:user._id
  });
  const [error,setError]=useState('')
  const [success,setSuccess]=useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'description') {
      // Split the input value by newlines into an array
      const descriptionArr = value.split('\n');
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: descriptionArr,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    addJob(formData)
.then(data=>{
  console.log(data)
  if(data.error){
    
      setError(data.error)
      setSuccess(false)
    }
    else{
      navigate('/jobgiver')
      setSuccess(true)
      setError('')
    }
  
})
  };

  const showError=()=>{
    if(error){
      return <div className='alert alert-danger'>{error}</div>
    }
  }
  const showSuccess=()=>{
    if(success){
      return <div className='alert alert-success'>Job Posted Successfully</div>
    }
  }

  return (
    <>
    <Navbar/>
    <div className="container">
       {showError()}
{showSuccess()}
      <h1>Post a Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            className="form-control"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="education">Education</label>
          <input
            type="text"
            className="form-control"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description.join('\n')}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </>
  );
}

export default JobPostingForm;