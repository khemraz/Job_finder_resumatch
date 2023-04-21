import React, { useEffect, useState } from 'react'
import { getUserDetails, isAuthenticated } from '../api/userAPI'

import Navbar from '../components/Navbar'
import Form from '../components/Profile_form'
import { Link } from 'react-router-dom'

const Profile = () => {
    
const {user}=isAuthenticated()
    const [Userdetail,setUserdetail]=useState({})
    const[detail,setdetail]=useState([])
    const[skilldetail,setskilldetail]=useState([])
    const[experiencedetail,setexperiencedetail]=useState([])

    useEffect(()=>{
        getUserDetails(user._id)
        .then(data=>{
            setUserdetail(data)
            setdetail(data.education)
            console.log(data)
        })
    },[])
    
  return (
    <div>
        <Navbar/>
        <div className="container">
      <h1>User Information</h1>
      <div className="row">
        <div className="col-md-6">
          <p>Name: {Userdetail.username}</p>
          <p>Gender: {Userdetail.gender}</p>
          <p>Email: {Userdetail.email}</p>
          <p>Phone Number: {Userdetail.phone}</p>
          <p>Address: {Userdetail.location}</p>
          <p>Education:</p>
          <ul>
            {detail && detail.map((item, index) => (
              <li key={index}>
                <p>{item.school}</p>
                <p>{item.degree}</p>
                <p>
                  {item.startDate} - {item.endDate}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <p>Skills:</p>
          <ul>
            {Userdetail && Userdetail.skill && Userdetail.skill.map((item) => (
              <li key={item._id}>{item.skill}</li>
            ))}
          </ul> 
          <p>Experience:</p>
          <ul>
            {Userdetail && Userdetail.experience && Userdetail.experience.map((item, index) => (
               <li key={index}>
                <p>{item.company}</p>
                <p>{item.title}</p>
                <p>
                  {item.startDate} - {item.endDate}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
        {/* <button className='btn btn-success' onClick={(e)=>{
            e.preventDefault()
            if(Skill){
                showSkill(false)
            }
            else{
                showSkill(true)    
            }
            
            }}> Add Skill</button> */}
        
        {/* {
            Skill &&  */}
            {/* <button className='btn btn-success' onClick={(e)=>{
                e.preventDefault()
                if(Form){
                    showForm(false)
                }
                else{
                    showForm(true)
                }
            }}>Add Resume Info</button>
            {
                Form && Form
            } */}
            <Link to={'/updateresume'}><button className='btn btn-success'>Update Resume Information</button></Link>
    </div>
  )
}

export default Profile