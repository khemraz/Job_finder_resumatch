import React, { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { userRegister } from '../api/userAPI'
import Navbar from '../components/Navbar'

const Signup = () => {
  const userReducer=(state,event)=>{
    return {...state,[event.target.name]:event.target.value}
}
const [error,setError]=useState('')
  const [success,setSuccess]=useState(false)
const [user_info,setUserInfo]=useReducer(userReducer,{})
console.log(user_info)
const handleSubmit=(e)=>{
  e.preventDefault()
// console.log(user_info)

userRegister(user_info)
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
}

const showError=()=>{
  if(error){
    return <div className='alert alert-danger'>{error}</div>
  }
}
const showSuccess=()=>{
  if(success){
    return <div className='alert alert-success'>User Registered SUccesfully</div>
  }
}
  return (
    <div>
        <Navbar/>
{showError()}
{showSuccess()}
<div className='row justify-content-center'>
    <div className='col col-sm-12 col-md-10 col-lg-8 col-xl-5'>
         <main className="form-signin w-100 m-auto my-5 border border-5 border-secondary rounded-5 p-5 shadow-lg">
    <form>
    <div className='text-center'>
    {/* <img className="mb-4" src="../images/logo.png" alt="" width="72" height="57"/> */}

    </div>
      <h1 className="h3 mb-3 fw-normal">REGISTER AS JOBSEEKER</h1>
      


      <div className="form-floating my-3">
        <input type="text" className="form-control" id="fname" placeholder="firstname" name={"username"}onChange={setUserInfo}/>
        <label htmlfor="fname">Username</label>
      </div>
      <div className="form-floating my-3">
        <input type="number" className="form-control" id="phone" placeholder="Phone Number" onChange={setUserInfo} name="phone"/>
        <label htmlfor="phone">Phone Number</label>
      </div>
      <div className="form-floating my-3">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={setUserInfo}/>
        <label htmlfor="floatingInput">Email address</label>
      </div>
      <div className="form-floating my-3">
        <input type="text" className="form-control" id="address" placeholder="address" name={"location"}onChange={setUserInfo}/>
        <label htmlfor="address">Address</label>
      </div>
      <div className="form-floating my-3">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={setUserInfo} name='password'/>
        <label htmlfor="floatingPassword">Password</label>
      </div>
      <div className="form-floating my-3">
       <div className="form-control d-flex justify-content-evenly">
        <div className="form-radio">
            <input type="radio" name="gender" id="m" value={"male"} className="me-2"onChange={setUserInfo}/><label htmlfor="m">Male</label>
        </div>
        <div className="form-radio">
            <input type="radio" name="gender" id="f" value={"female"} className="me-2"onChange={setUserInfo}/><label htmlfor="f">Female</label>
        </div>
        <div className="form-radio">
            <input type="radio" name="gender" id="o" className="me-2" onChange={setUserInfo}/><label htmlfor="o">Other</label>
        </div>
       </div>
       <label htmlfor="">Gender</label>
      </div>
      <div className="form-floating my-3">
        <select className="form-control" name='preference' id='preference' onChange={setUserInfo}>
            <option value="">(select your preference)</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="QA">QA</option>
        </select>
        <label htmlfor="preference">Job Preference</label>
      </div>

      
       <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit} >Sign up</button>
      Already,have an account? <Link to='/login'>signin</Link>
      <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
    </form>
  </main>
    </div>
    </div>
    </div>
    
  )
}

export default Signup