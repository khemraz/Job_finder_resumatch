const express = require('express')
require('dotenv').config()
require('./database/connection')

//middleware
const bodyParser=require('body-parser') 
const morgan=require('morgan')
const cors=require('cors')

//routes
const UserRoute=require('./Routes/userRoutes')
const CompanyRoute=require('./Routes/companyRoutes')
const JobRoute=require('./Routes/jobRoutes')
const ApplyRoute=require('./Routes/applyRoutes')

const app=express()
const port=process.env.port

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
//user route
app.use('/api',UserRoute)
//company route
app.use('/api',CompanyRoute)

//job route
app.use('/api',JobRoute)

//apply route
app.use('/api',ApplyRoute)

app.listen(port,()=>{
    console.log(`server started successfully at port ${port}`)
})