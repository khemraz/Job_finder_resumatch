const express = require('express')
const { companyRegister, emailVerification, resendVerification, forgetpassword, resetPassword } = require('../controller/companyController')
const { validate, companyCheck } = require('../validation/validator')

const router=express.Router()

//giver
router.post('/companyregister',companyCheck,validate, companyRegister)
router.get('/companyemailverification/:token',emailVerification)
router.post('/companyresendverification',resendVerification)
router.post('/companyforgetpassword',forgetpassword)
router.post('/companyresetpassword/:token',resetPassword)

module.exports=router