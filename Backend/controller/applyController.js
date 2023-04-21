const applyModel = require('../models/applyModel')


exports.apply = async (req, res) => {
    let apply=new applyModel({
       user:req.body.user,
       job:req.body.job,
    })
    apply=await apply.save()
    if(!apply){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(apply)
}
