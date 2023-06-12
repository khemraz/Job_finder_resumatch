const express = require('express')
const { apply, getUsersByJob, getJobsByUser, updateApplicationStatus, getAllApplies, getAppliesByJob, getAppliesByUser } = require('../controller/applyController')

const router=express.Router()

//giver
router.post('/apply',apply)
router.get('/userbyjob/:jobId',getUsersByJob)
router.get('/jobbyuser/:userId',getJobsByUser)
router.get('/getallapply',getAllApplies)
router.get('/getapplybyjob/:jobId',getAppliesByJob)
router.get('/getapplybyuser/:userId',getAppliesByUser)

router.post('/updatestatus',updateApplicationStatus)
module.exports=router