const express = require('express')
const { addJob, getJobDetails, getAllJob, getJobByCompany } = require('../controller/jobController')

const router=express.Router()

//giver
router.post('/addjob',addJob)
router.get('/getjobdetails/:id',getJobDetails)
router.get('/getalljob',getAllJob)
router.get('/getjobbycompany/:id',getJobByCompany)

module.exports=router