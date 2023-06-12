const Apply = require('../models/applyModel')
const Job = require('../models/jobModel')

exports.addJob = async (req, res) => {
    let jobToAdd = new Job({
        title: req.body.title,
        location: req.body.location,
        deadline: req.body.deadline,
        experience: req.body.experience,
        education: req.body.education,
        description: req.body.description,

        company: req.body.company
    })
    jobToAdd = await jobToAdd.save()
    if (!jobToAdd) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(jobToAdd)
}

//get job detail
exports.getJobDetails = async (req, res) => {
    let job = await Job.findById(req.params.id).populate('company')
    if (!job) {
        return res.status(400).json
            ({ error: "something went wrong" })
    }
    res.send(job)
}


//get all job detail
exports.getAllJob = async (req, res) => {
    let job = await Job.find().populate('company')
    if (!job) {
        return res.status(400).json
            ({ error: "something went wrong" })
    }
    res.send(job)
}
//get job by company
exports.getJobByCompany = async (req, res) => {
    let job = await Job.find({ company: req.params.id })
    if (!job) {
        return res.status(400).json
            ({ error: "something went wrong" })
    }
    res.send(job)
}

//update job
exports.updateJob = async (req, res) => {
    let jobToupdate = await Job.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        location: req.body.location,
        deadline: req.body.deadline,
        experience: req.body.experience,
        education: req.body.education,
        description: req.body.description,
        
    }, { new: true })
    if (!jobToupdate) {
        return res.status(400).json({ error: "Job not found" })
    }
    res.send(jobToupdate)
}

//to delete a job
// exports.deleteJob = (req, res) => {
//     Job.findByIdAndRemove(req.params.id)
//         .then(jobToDelete => {
//             if (!jobToDelete) {
//                 return res.status(400).json
//                     ({ error: "Job not found" })
//             }
//             else {
//                 Apply.deleteMany({ job:req.params.id })
//                 .then(()=>{
//                 res.send({ message: "Job deleted successfully" })

//                 })

//             }
//         })
//         .catch(err => res.status(400).json({ error: err.message }))
// }
exports.deleteJob = (req, res) => {
    const jobId = req.params.id;

    if (!jobId) {
        return res.status(400).json({ error: "Job ID not provided" });
    }

    Job.findByIdAndRemove(jobId)
        .then(jobToDelete => {
            if (!jobToDelete) {
                return res.status(400).json({ error: "Job not found" });
            } else {
                Apply.deleteMany({ job: jobId })
                    .then(() => {
                        res.send({ message: "Job deleted successfully" });
                    })
                    .catch(err => {
                        res.status(400).json({ error: err.message });
                    });
            }
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(400).json({ error: "Invalid Job ID" });
            }
            res.status(400).json({ error: err.message });
        });
};



exports.searchJob = async (req, res) => {
    let jobs = await Job.aggregate(
        [{
            $match: {
                title: { $regex: req.params.search, $options: "i" }
            }
        }]
    )
    if (!jobs) {
        return res.status(400).json({ error: "Job not found" })
    }
    res.send(jobs)
}