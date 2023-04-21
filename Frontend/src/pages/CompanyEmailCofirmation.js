import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { verifyEmail } from '../api/companyAPI'

import Navbar from '../components/Navbar'

const CompanyEmailConfirmation = () => {
  const params = useParams()
  const token=params.token
  const [error,setError]=useState('')
  const [success,setSuccess]=useState('')

  useEffect(()=>{
    //send token to backend
    verifyEmail(token)
    .then(data=>{
        if(data.error){
            setError(data.error)
        }
        else{
            setSuccess(data.message)
        }
    })
  },[])

  const showError=()=>{
    if(error){
        return <div className='alert alert-danger'>{error}</div>
    }
  }
  const showSuccess=()=>{
    if(success){
        return <div className='alert alert-success'>{success}</div>
    }
  }
  
  
  
    return (
    <div>
        <Navbar/>
        {showError()}
        {showSuccess()}
    </div>
  )
}

export default CompanyEmailConfirmation