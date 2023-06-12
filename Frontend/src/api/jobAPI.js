import { API } from "../config"

export const addJob=(user)=>{
    
    return fetch(`${API}/addjob`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}

//details
export const getJobDetails=(id)=>{
    return fetch(`${API}/getjobdetails/${id}`)
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})

}

//get all job
export const getAllJob=()=>{
    return fetch(`${API}/getalljob`)
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})

}
export const searchJob=(title)=>{
    return fetch(`${API}/search/${title}`)
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})

}

//details by company
export const getJobDetailsByCompany=(id)=>{
    return fetch(`${API}/getjobbycompany/${id}`)
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})

}

//update job
export const updateJob=(user,id)=>{
    return fetch(`${API}/updatejob/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)

    })
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}

//delete job
export const deleteJob=(id)=>{
    return fetch(`${API}/deletejob/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}