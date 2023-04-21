import React, { useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate, isAuthenticated, login } from '../api/userAPI'
import Navbar from '../components/Navbar'

const Login = () => {
    const userReducer=(state,event)=>{
        return {...state,[event.target.name]:event.target.value}
    }
    const [error,setError]=useState('')
      const [success,setSuccess]=useState(false)

    const [user_info,setUserInfo]=useReducer(userReducer,{})
    const navigate=useNavigate()
    const {user}=isAuthenticated()
    const handleSubmit=(e)=>{
        e.preventDefault()
      console.log(user_info)
      
      login(user_info)
    .then(data=>{
      if(data.error){
        setError(data.error)
      }
      else{
        authenticate(data)
        setSuccess(true)
        // console.log(data)
      }
    })
      }
      
      const showError=()=>{
        if(error){
          return <div className='alert alert-danger'>{error}</div>
        }
      }
      
      const redirect=()=>{
        if(success){
          if(user && user.role===2){
          navigate('/admin/dashboard')
        }
        else if(user && user.role===1){
          navigate('/')
        }
        else{
            navigate('/')
        }
        }
      }

    return (
        <div>
            <Navbar/>
            {showError()}
            {redirect()}
            <div className='row justify-content-center'>
                <div className='col col-sm-12 col-md-10 col-lg-8 col-xl-5'>
                    <main className="form-signin w-100 m-auto my-5 border border-5 border-secondary rounded-5 p-5 shadow-lg">
                        <form>
                            <div className='text-center'>
                                {/* <img className="mb-4" src="../images/logo.png" alt="" width="72" height="57" /> */}

                            </div>
                            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                            <div className="form-floating">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"  name='email'onChange={setUserInfo}/>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={setUserInfo} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            
                            
                            <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Sign in</button>

                            <div className='d-flex justify-content-between'>
                                
                                <Link to='/forgetpassword'>Forgot Password</Link>
                            </div>

                            <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
                        </form>
                    </main>
                </div>
            </div>


        </div>
    )
}

export default Login