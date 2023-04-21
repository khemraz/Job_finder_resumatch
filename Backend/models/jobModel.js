const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
       
    },
    
    location:{
        type:String,
        
    },
   deadline:{
        type:Date,
       
    },
    experience:{
        type:String,
       
    },
    education:{
        type:String,
        
    },
    description:[{
        type:String,
        
    }],
    company:{
        type:ObjectId,
        ref:'Company'
    }
    


})
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;