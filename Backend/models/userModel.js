const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    preference: {
        type: String,
    },
    gender:{
        type:String,
    },
    location:{
        type:String,
        // required:true
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false
    },
    role: {
        type: Number,
        default:0

    },

    experience: [{
        company: { type: String },
        title: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
    }],
    education: [{
        school: { type: String },
        degree: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
    }],
    skill: [{
        skill:{type: String}        
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
