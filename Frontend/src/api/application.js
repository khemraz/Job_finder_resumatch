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