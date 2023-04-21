const express = require('express')
const { apply } = require('../controller/applyController')

const router=express.Router()

//giver
router.post('/apply',apply)


module.exports=router