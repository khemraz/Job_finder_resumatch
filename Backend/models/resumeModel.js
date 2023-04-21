const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    experience: [{
        company: { type: String },
        position: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
      }],
      education: [{
        school: { type: String },
        degree: { type: String },
        startDate: { type: Date },
        endDate: { type: Date }
      }],
  skills: [{
    skill:{type: String}
    
  }]
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;




