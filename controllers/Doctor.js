const User = require('../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.login = async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});

        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '10000000'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.register=(req,res)=>
{
    if(!req.body.email){
        return res.status(400).send({
            message: "content can't be empty"
        });
    }

    //registeration for Doctor
    const register= new User({ 
        name:req.body.name,
        email:req.body.email,
        password:req.body.password

    });

    //save data in database
    register.save().then(data=>{res.send(data);
    }).catch(err =>
        {
            res.status(500).send({
                message:err.message || "some error occured"
  
            });
        });
};



//5ebb09da817a17100c24e124
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..r3UbFHyemaNuzuUEvBBBawefyjm-AyvbglfyTDfTf8I