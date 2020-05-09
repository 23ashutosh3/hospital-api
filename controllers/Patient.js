const User = require('../models/patient');
 const jwt = require('jsonwebtoken');




module.exports.AllPatient=(req,res) =>{
    User.findOne().then(user =>{
        res.send(user);
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "some error occured"
        });
    });
};


module.exports.register = function(req, res){
    

    User.findOne({Phone: req.body.Phone}, function(err, user){
        if(err)
        {
            res.status(500).send({
                message:err.message || "some error occured"
            });
            return;
        }

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.send(user);
            })
        }else{
            return res.redirect('/patients');
        }

    });
}






