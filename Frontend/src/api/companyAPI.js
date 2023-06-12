import { API } from "../config"

export const companyRegister=(user)=>{
    
    return fetch(`${API}/companyregister`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}
export const verifyEmail = (token)=>{
    return fetch(`${API}/companyemailverification/${token}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const getCompanyDetails=(id)=>{
    return fetch(`${API}/getcompanydetails/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }

    })
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}