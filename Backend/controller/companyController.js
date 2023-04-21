const crypto =require('crypto')

const jwt = require('jsonwebtoken')

const Company = require('../models/companyModel')


const Token = require('../models/tokenModel')

const sendEmail = require('../utils/setEmail')
const { expressjwt } = require('express-jwt')

//to register new user
exports.companyRegister = async (req, res) => {
    //destructuring to get user name,email.password
    const { companyname, email, password, phone, sector,user } = req.body
    let company = await Company.findOne({ email: email })
    if (company) {
        return res.status(400).json({ error: "email already registered." })
    }
    let userToRegister = new Company({
        companyname: companyname,
        email: email,
        password: password,
        phone: phone,
        sector: sector,
        user:user

    })
    userToRegister = await userToRegister.save()
    if (!userToRegister) {
        return res.status(400).json({ error: 'something went wrong' })
    }

//     //generate token
//     let token = new Token({
//         token: crypto.randomBytes(24).toString('hex'),
//         user: userToRegister._id
//     })
//     token = await token.save()
//     if (!token) {
//         return res.status(400).json({ error: "Something Went Wrong" })
//     }
//     //sent verification email
//     // const url=`http://localhost:5001/api/emailverification/${token.token}`
//     const url = `${process.env.FRONTEND_URL}/companyemailverification/${token.token}`

//     sendEmail({
//         from: "noreply@example.com",
//         to: email,
//         subject: "verification Email",
//         text: `CLick on the following link or copy paste it in your browser to verify to your email.${url}`,
//         html: `<a href="${url}"><button>Verify email</button></a>`
//     })

    res.send(userToRegister)
}

//to verify email/user
exports.emailVerification = async (req, res) => {
    
    //check token
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Invalid token or token may have expired" })
    }
    
    //check user
    let user = await Company.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User associated with the token not found" })
    }

    //check if already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified.Login to continue" })
    }
    //verify user
    user.isVerified = true
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send({ message: "User verified successfully" })
}

//resent verification
exports.resendVerification = async (req, res) => {
    //check email
    let user = await Company.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "Email not registered." })
    }
    //check if already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "user already verified.login to continue" })
    }
    //generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something Went Wrong" })
    }
    //send token in email
    //const url=`http://localhost:5000/api/emailverification/${token.token}`
    const url = `${process.env.FRONTEND_URL}/emailverification/${token.token}`

    sendEmail({
        from: "noreply@example.com",
        to:/*{req.body.email,}*/user.email,
        subject: "verification Email",
        text: `CLick on the following link or copy paste it in your browser to verify to your email.${url}`,
        html: `<a href="${url}"><button>Verify email</button></a>`
    })

    res.send({ message: "Email verification link has been sent to your email." })
}

//forget password
exports.forgetpassword = async (req, res) => {
    //check email
    let user = await Company.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "User not registered" })
    }
    //generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "Something went wrong" })
    }

    //send reset link with token in email
    //    const url=`http://localhost:5000/api/resetpassword/${token.token}`
    const url = `${process.env.FRONTEND_URL}/resetpassword/${token.token}`
    sendEmail({
        from: "noreply@eg.com",
        to: user.email,
        subject: "reset password",
        text: `click on the following link or copy paste it in your browser to reset your password.${url}`,
        html: `<a href='${url}'><button>Reset</button></a>`
    })
    res.send({ message: "Password reset link has been sent to your email." })

}

//reset password
exports.resetPassword = async (req, res) => {
    //check token
    let token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Inavalid token or token may have expired" })
    }
    // find user
    let user = await Company.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User associated with the token not found" })
    }
    //reset pw
    user.password = req.body.password
    user = await user.save()
    if (!user) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send({ message: "Password reset successful" })
}



 //user details
 exports.getUserDetails=async(req,res)=>{
    let user=await Company.findById(req.params.id)
    if(!user){
        return res.status(400).json
        ({error:"something went wrong"})
    }
    res.send(user)
 }

 //update user
 exports.updateUser=async(req,res)=>{
    let userToupdate = await Company.findByIdAndUpdate(req.params.id,{
        username:req.body.username,
        email:req.body.email
    },{new:true})
    if(!userToupdate){
        return res.status(400).json({error:"User not found"})
    }
    res.send(userToupdate)
 }
 
 //to delete an user
exports.deleteUser=(req,res)=>{
    Company.findByIdAndRemove(req.params.id)
    .then(userToDelete=>{
        if(!userToDelete){
        return res.status(400).json
        ({error:"User not found"})
        }
        res.send({message:"user deleted successfully"})
    })
    .catch(err=>res.status(400).json({error:err.message}))
}