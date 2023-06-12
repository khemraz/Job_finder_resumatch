const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const applySchema = new mongoose.Schema({
  user:{
    type:ObjectId,
    ref:'User'
  },
  job:{
    type:ObjectId,
    ref:'Job'
  },
  appliedon:{
    type:Date,
    default:Date.now()
  },
  similarity:{
    type:String
  },
  status:{
    type:Boolean
  }

})
const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;