import React from 'react'
import { useReducer, useState } from 'react'

import { Link } from 'react-router-dom'
import { companyRegister } from '../api/companyAPI'
import Navbar from '../components/Navbar'
import { userRegister } from '../api/userAPI'

const Register = () => {
  const userReducer=(state,event)=>{
    return {...state,[event.target.name]:event.target.value}
}
const [error,setError]=useState('')
  const [success,setSuccess]=useState(false)
const [Companyinfo,setCompanyInfo]=useReducer(userReducer,{})
console.log(Companyinfo)
const handleSubmit=(e)=>{
  e.preventDefault()
console.log(Companyinfo)
userRegister({
  username:Companyinfo.companyname,
  password:Companyinfo.password,
  phone:Companyinfo.phone,
  email:Companyinfo.email,
  role:1
})
.then(data=>{
  if(data.error){
    console.log(data.error)

  }
  else{
    // Companyinfo.user=data._id
    // setCompanyInfo({"name":"user","value":data._id})

    companyRegister({...Companyinfo, "user": data._id})
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
      <h1 className="h3 mb-3 fw-normal">REGISTER AS EMPLOYER</h1>
      


      <div className="form-floating my-3">
        <input type="text" className="form-control" id="cname" name='companyname'placeholder="companyname" onChange={setCompanyInfo}/>
        <label htmlfor="cname">Organization Name</label>
      </div>
      <div className="form-floating my-3">
        <input type="number" className="form-control" id="phone" name='phone'placeholder="Phone Number" onChange={setCompanyInfo}/>
        <label htmlfor="phone">Phone Number</label>
      </div>
      <div className="form-floating my-3">
        <input type="email" className="form-control" id="floatingInput"name='email' placeholder="name@example.com" onChange={setCompanyInfo} />
        <label htmlfor="floatingInput">Email address(official)</label>
      </div>
      <div className="form-floating my-3">
        <input type="password" className="form-control" id="floatingPassword"name='password' placeholder="Password" onChange={setCompanyInfo}/>
        <label htmlfor="floatingPassword">Password</label>
      </div>
      
      <div className="form-floating my-3">
        <select className="form-control" name='sector' onChange={setCompanyInfo}>
            <option value="">(select your Organization Type)</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Network">Network</option>
        </select>
        <label htmlfor="">Organization Sector</label>
      </div>
      
      
       <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign up</button>
      Already,have an account? <Link to='/login'>signin</Link>
      <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
    </form>
  </main>
    </div>
    </div>
    </div>
  )
}

export default Register