const express = require('express')
const { userRegister, updateResume, emailVerification, resendVerification, forgetpassword, resetPassword, signIn, signOut, getUserDetails } = require('../controller/userController')
const { userCheck, validate } = require('../validation/validator')

const router=express.Router()

//seeker
router.post('/register',userCheck,validate, userRegister)
router.get('/emailverification/:token',emailVerification)
router.post('/resendverification',resendVerification)
router.post('/forgetpassword',forgetpassword)
router.post('/resetpassword/:token',resetPassword)
router.post('/signin',signIn)
router.get('/signout',signOut)
router.get('/userdetails/:id',getUserDetails)
// router.get('/userlist',userList)
// router.put('/updateuser/:id',updateUser)
// router.delete('/deleteuser/:id',deleteUser)
router.put('/updateresume/:id',updateResume)




module.exports=router
