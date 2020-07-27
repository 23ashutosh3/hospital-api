const Patient = require('../models/patient');
const Report = require('../models/report');
const User=require('../models/doctor');


//  const jwt = require('jsonwebtoken');


//  module.exports.patient=(req,res) =>{
//     Patient.findOne().then(user =>{
//         res.send(user);
//     }).catch(err =>{
//         res.status(500).send({
//             message:err.message || "some error occured"
//         });
//     });
// };


// create report
module.exports.createReport=async(req,res)=>
{
    try{
        let patient = await Patient.findOne({_id:req.params.id});

        //check patient are there
        if(!patient)
        {
            return res.json(400,
                {
                    maessage:"patient not found"
                })
        }
        let doctor= await User.findOne({_id:req.user});


        //create report
        const Newrepo=await Report.create(
            {
                status:req.body.status,
                doctor:doctor,
                patient:patient
            }
        );
 
       
      
        return res.json(200,{
            message:"report created",
            report:Newrepo
        });

    }
    catch(err){
  return res.json(500,{
      message:"Internal error"
  });
    }
}


//find all patient
module.exports.AllPatient=(req,res) =>{
    Patient.find().then(user =>{
        res.send(user);
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "some error occured"
        });
    });
};



//register the patient by the doctor 

module.exports.register = async function(req, res)
{
    try{
        if(!req.body.name||!req.body.phone){
            return res.json(400,{
                message:"complete the field"
            })
        }

        const patient= await Patient.findOne({phone: req.body.phone})

        //if patient are already present
        if(patient)
        {
            return res.json(200,{patient:patient});
        }

        const doctoro =await User.findById({_id:req.user._id});
        //register patient

        const newOne=await Patient.create({
            name:req.body.name,
            phone:req.body.phone,
           
        });

        return res.json(200,
            {
                message:"patient created",
                patient:newOne,
              
            });

       }
       //if any error
       catch(err)
       {
           return res.json(500,
            {
                message:"internal error"
            });
       }
    }





 module.exports.all_reports = async function(req, res)
 {
     try{
        const patient = await Patient.findOne({_id:req.params.id})



        if (!patient) {
          return res.json(400, {
            message: "patient is not found!"
          });
        }

        const reports =await Report.find({patient:req.params.id})
        .populate("patient")
        .populate("doctor");

        return res.json(200,{
            data:{
                reports:reports
            }
        });
    

    }catch(err)
    {
        return res.json(500,{
            mesaage:"error"
        })
    }
    
  
 }
