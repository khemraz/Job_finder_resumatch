
import { API } from "../config"

export const Apply=(user,job)=>{
    return fetch(`${API}/apply`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({user,job})
    })
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})

}
//users who applied
export const getUsersByJob=(id)=>{
    return fetch(`${API}/userbyjob/${id}`)
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}

//jobs who applied
export const getJobsByUser=(id)=>{
    return fetch(`${API}/jobbyuser/${id}`)
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}

//apply status
export const updateStatus=(user,job,status)=>{
    console.log(user,job)
    return fetch(`${API}/updatestatus`,{
    method:"POST",
        headers:{
            "Content-Type":"application/json"
            
        },
        body:JSON.stringify({user:user,job:job,status:status})
    }
    )
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}

//allappliesby job
export const getAppliedByJob=(id)=>{
    return fetch(`${API}/getapplybyjob/${id}`)
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}

//allapplies by user
export const getAppliedByUser=(id)=>{
    return fetch(`${API}/getapplybyuser/${id}`)
    .then(response=>{return response.json()})
    .catch(error=>{return console.log(error)})
}