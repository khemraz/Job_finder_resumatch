const express = require('express')
const { addJob, getJobDetails, getAllJob, getJobByCompany, updateJob, searchJob, deleteJob } = require('../controller/jobController')

const router=express.Router()

//giver
router.post('/addjob',addJob)
router.get('/getjobdetails/:id',getJobDetails)
router.get('/getalljob',getAllJob)
router.get('/getjobbycompany/:id',getJobByCompany)
router.put('/updatejob/:id',updateJob)
router.get('/search/:search', searchJob)
router.delete('/deletejob/:id', deleteJob)

module.exports=router