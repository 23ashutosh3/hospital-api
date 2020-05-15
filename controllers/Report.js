const Report = require('../models/report');
const User=require('../models/doctor');
const Patient=require('../models/patient');


module.exports.patientStatus=async function(req,res)
{
try{

    const patientReport = await Report.find({status:req.params.status})
    .sort('-createdAt')
    .populate({
        path:'doctor',
    })
    .populate({
        path:'patient'
    });

    return res.json(200,{
        data:
        {
            patientReport :patientReport,
            status:req.params.status
        },
        
    });
}catch(error)
{
    return res.json(500,{
        message:"internal error"
    });
}
   
}


module.exports.Allreport=(req,res) =>{
    Report.find().then(user =>{
        res.send(user);
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "some error occured"
        });
    });
};