const User = require('../models/patient');
const Report = require('../models/report');
const doctor=require('../models/doctor')


 const jwt = require('jsonwebtoken');


 module.exports.patient=(req,res) =>{
    User.findOne().then(user =>{
        res.send(user);
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "some error occured"
        });
    });
};



module.exports.AllPatient=(req,res) =>{
    User.find().then(user =>{
        res.send(user);
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "some error occured"
        });
    });
};


module.exports.register = async function(req, res)
{
    

   let user= await User.findOne({Phone: req.body.Phone})
   {
       try
       {
         if(user)
           {
             return res.json(200,{user:user})
           }
        else      
          {
             const covdoc= await doctor.findById({_id:req.user._id})

            const covpati= await User.create(
                {
                  name:req.body.name,
                  phone:req.body.phone,
                  doctor:covdoc._id
                }
            );

            return res.json(200,{
                message: "patient registered",
                user:covpati
            })

        }
    }

    catch(err)
    {
        return res.status(500).json({
            message: "Internal Server Error"
          });
    }
        
    }


}

// module.exports.AllPatient=async 

//         if (!user){
               
//          const covdoc= doctor.findById({_id:req.user._id})
                



//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.send(user);
//             })
//         }else{
//             return res.redirect('/patients/one');
//         }

//     });
// }

// module.exports.all_reports = function(req, res)
// {
  
//     Report.findOne({_id: req.params.id}, function(err, user){
//         if(err)
//         {
//             res.status(500).send({
//                 message:err.message || "some error occured"
//             });
//             return;
//         }

//         if (!user){
//             Report.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.send(user);
//             })
//         }else{
//             return res.send(user);
//         }

//     });
  
// }
module.exports.createReport = async function(req, res)
{
    try{
        let patient = await Patient.findOne({_id:req.params.id});
    
        let doctor = await User.findOne({_id:req.user});
    
        const latestRep=await Report.create({
            doctor:doctor,  
            patient:patient,
            status:req.body.status
        });
        return Response.json(200,{
            data: {
                latestRep:latestRep 
            },
            messaage:"create report sucessfull"
        })

    } catch(error)
    {
        return response.json(500, {
            message: "Internal Server Error" + error
          });
    }
   
    
}