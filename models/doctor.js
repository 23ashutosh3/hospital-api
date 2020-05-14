const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    email:
       {
        type:String,
        required:true,
        unique:true
       },

    password:
            {
        type:String,
        required:true
            },

    name:
         {
        type:String,
        required:true
         }
   
       
},{
    timestamps:true
});


const UserDoctor=mongoose.model('UserDoctor',userSchema);

module.exports=UserDoctor;



/////5ebd3c1b9730331ea87ff8e35ebd3c1b9730331ea87ff8e35ebd3c1b9730331ea87ff8e3