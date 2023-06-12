const applyModel = require('../models/applyModel')
const User = require('../models/userModel')
const Job=require('../models/jobModel')



exports.apply = async (req, res) => {

  let applied = await applyModel.findOne({user:req.body.user,job:req.body.job})
  if(applied)
  {
    return res.status(400).json({error:"Already applied Job"})
  }
    let apply=new applyModel({
       user:req.body.user,
       job:req.body.job,
       status:req.body.status
    })
    apply=await apply.save()
    if(!apply){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(apply)
}


// exports.getUsersByJob = async (req, res) => {
//   try {
//     const jobId = req.params.jobId;

//     // Find all applies for the given job ID
//     const applies = await applyModel.find({ job:jobId });
    
//     // Get all user IDs from the applies
//     const userIds = applies.map((apply) => apply.user);

//     // Find all users with the given IDs
//     const users = await User.find({ _id: { $in: userIds } });
    
//     res.json({ users });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

exports.getUsersByJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Find all applies for the given job ID
    const applies = await applyModel.find({ job:jobId });
    
    // Loop over the applies and get the user information and similarity score
    const users = [];
    for (const apply of applies) {
      const user = await User.findById(apply.user);
      const similarity = apply.similarity;
      users.push({ user, similarity });
    }
    
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getJobsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all applies by the given user ID
    const applies = await applyModel.find({ user: userId });

    // Loop over the applies and get the job information and similarity score
    const jobs = [];
    for (const apply of applies) {
      const job = await Job.findById(apply.job).populate('company');
      const similarity = apply.similarity;
      jobs.push({ job, similarity });
    }

    res.json({ jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const user = req.body.user;
    const job = req.body.job;

    const status = req.body.status;

let jobUserMatch = await applyModel.findOne(  {user:user,job:job} );
if(!jobUserMatch){
return res.status(400).json({error:"Something error"})
}
jobUserMatch.status=status
jobUserMatch= await jobUserMatch.save()
if(!jobUserMatch){
  return res.status(400).json({error:"Something went wrong"})
  }
res.json(jobUserMatch)
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
}
};

 //get all job detail
 exports.getAllApplies=async(req,res)=>{
  let job=await applyModel.find().populate('user').populate('job')
  if(!job){
      return res.status(400).json
      ({error:"something went wrong"})
  }
  res.send(job)
}

//getapplies by job
exports.getAppliesByJob=async(req,res)=>{
  let job=await applyModel.find({job:req.params.jobId}).populate('user').populate('job')
  if(!job){
      return res.status(400).json
      ({error:"something went wrong"})
  }
  res.send(job)
}
//getapplies by user
exports.getAppliesByUser=async(req,res)=>{
  // let user=await applyModel.find({user:req.params.userId}).populate('job')
  let user = await applyModel.find({ user:req.params.userId }).populate({
    path: 'job',
    populate: {
      path: 'company',
      model: 'Company',
    },
  });
  if(!user){
      return res.status(400).json
      ({error:"something went wrong"})
  }
  res.send(user)
}
// const natural = require('natural');
// const { tfidf, cosineSimilarity } = require('../utils/similarity');

// exports.getUsersByJob = async (req, res) => {
//     try {
//       const jobId = req.params.jobId;
  
//       // Find all applies for the given job ID
//       const applies = await applyModel.find({ job: jobId });
  
//       // Get all user IDs from the applies
//       const userIds = applies.map((apply) => apply.user);
  
//       // Find all users with the given IDs
//       const users = await User.find({ _id: { $in: userIds } });
  
//       // Get the job description and skills as arrays of terms
//       const job = await Job.findById(jobId);
//       const jobDescription = job.description;
//       const jobSkills = job.skill;
  
//       // Calculate the TF-IDF scores for the job terms
//       const tfidfScores = {};
//       const documents = users.map((user) => user.resume);
//       jobDescription.forEach((term) => {
//         const scores = documents.map((document) => tfidf(term, document, documents));
//         tfidfScores[term] = scores;
//       });
//       jobSkills.forEach((skill) => {
//         const scores = documents.map((document) => tfidf(skill, document, documents));
//         tfidfScores[skill] = scores;
//       });
  
//       // Calculate the cosine similarity between the job terms and each user's terms
//       const userScores = users.map((user) => {
//         const terms = natural.tokenize(user.resume);
//         const scores = Object.keys(tfidfScores).map((term) => {
//           const index = terms.indexOf(term);
//           return index === -1 ? 0 : tfidfScores[term][userIds.indexOf(user._id)];
//         });
//         const similarity = cosineSimilarity(scores, Object.values(tfidfScores).map((scores) => scores[userIds.indexOf(user._id)])) * 100;
//         return { username: user.username, similarity };
//       });
  
//       res.json({ users: userScores });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   };


