const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const companySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    sector: {
        type: String,
        
    },
    role: {
        type: Number,
        default:1
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    user:{
        type:ObjectId,
        ref:'User'
    }
})
const Company = mongoose.model('Company', companySchema);

module.exports = Company;