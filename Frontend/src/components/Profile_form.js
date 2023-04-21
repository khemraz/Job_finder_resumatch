import { useEffect, useState } from 'react';
import { putResumeDetails, isAuthenticated, getUserDetails } from '../api/userAPI';
import Navbar from './Navbar';
import { Navigate, useNavigate } from 'react-router-dom';

const Form = () => {
  const [skill, setSkill] = useState([{skill:'' }]);
  const [education, setEducation] = useState([{ school: '', degree: '', startDate: '', endDate: '' }]);
  const [experience, setExperience] = useState([{ title: '', company: '', startDate: '', endDate: '' }]);
  const [error,setError]=useState('')
  const [success,setSuccess]=useState(false)

  const navigate = useNavigate()

  const {user}=isAuthenticated()

  const handleAddSkill = () => {
    setSkill([...skill, {skill:''}]);
  };

  const handleSkillChange = (index,value) => {
    const newSkill = [...skill];
    newSkill[index]['skill'] = value;
    setSkill(newSkill);
  };

  const handleAddEducation = () => {
    setEducation([...education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }]);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { title: '', company: '', startDate: '', endDate: '' }]);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

useEffect(()=>{
  getUserDetails(user._id)
  .then(data=>{
    if(data.error){
      console.log(data.error)
    }
    else{
      setSkill(data.skill)
      setEducation(data.education)
      setExperience(data.experience)
    }
  })
  .catch(err=>console.log(err))
},[])
      console.log(experience)

  const handleSubmit = (event) => {
    event.preventDefault();
    putResumeDetails({education,experience,skill},user._id)
    .then(data=>{
        console.log(data)
        if(data.error){
          
            setError(data.error)
            setSuccess(false)
          }
          else{
            setSuccess(true)
            setError('')
          }
        
      })
    console.log('Education:', education);
    console.log('Experience:', experience);
    console.log('Skll:', skill);

    // Send data to backend API
  };
  const showError=()=>{
    if(error){
      return <div className='alert alert-danger'>{error}</div>
    }
  }
  const showSuccess=()=>{
    if(success){
      // return <div className='alert alert-success'>Info Updated SUccesfully</div>
      navigate('/profile')
    }
  }

  return (
    <>
    <Navbar/>
    <div className="container">

        {showError()}
        {showSuccess()}
      <form onSubmit={handleSubmit}>
        <h2>Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-3">
            <h4 className="mb-3">Education #{index + 1}</h4>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">School:</label>
                <input type="text" className="form-control" value={edu.school} onChange={(event) => handleEducationChange(index, 'school', event.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Degree:</label>
                <input type="text" className="form-control" value={edu.degree} onChange={(event) => handleEducationChange(index, 'degree', event.target.value)} />
              </div>
            </div>
            <div className="row">
              
              <div className="col-md-3">
                <label className="form-label">Start Date:</label>
                <input type="date" className="form-control" value={edu.startDate} onChange={(event) => handleEducationChange(index, 'startDate', event.target.value)} />
              </div>
              <div className="col-md-3">
                <label className="form-label">End Date:</label>
                <input type="date" className="form-control" value={edu.endDate} onChange={(event) => handleEducationChange(index, 'endDate', event.target.value)} />
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddEducation}>Add Education</button>
        <h2>Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Title:</label>
                <input type="text" className="form-control" value={exp.title} onChange={(event) => handleExperienceChange(index, 'title', event.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Company:</label>
                <input type="text" className="form-control" value={exp.company} onChange={(event) => handleExperienceChange(index, 'company', event.target.value)} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Start Date:</label>
                <input type="date" className="form-control" value={exp.startDate.Date} onChange={(event) => handleExperienceChange(index, 'startDate', event.target.value)} />
              </div>
              <div className="col-md-3">
                <label className="form-label">End Date:</label>
                <input type="date" className="form-control" value={exp.endDate} onChange={(event) => handleExperienceChange(index, 'endDate', event.target.value)} />
              </div>
              {/* <div className="col-md-6">
                <label className="form-label">Description:</label>
                <textarea className="form-control" value={exp.description} onChange={(event) => handleExperienceChange(index, 'description', event.target.value)} />
              </div> */}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddExperience}>Add Experience</button>
        <hr />
    <h4>Skills</h4>
    {skill.map((skill, index) => (
          <div key={index} className="mb-3">
            <label className="form-label">Skill:</label>
            <input type="text" className="form-control" name='skill' value={skill.skill} onChange={(event) => handleSkillChange(index, event.target.value)} />
            
            <hr />
          </div>
        ))}
        <button type="button" className="btn btn-primary mb-3" onClick={handleAddSkill}>Add Skill</button>
        <hr />
       
      
    
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
    </>
  );
};
export default Form;
