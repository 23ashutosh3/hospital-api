const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    Phone:
       {
        type:Number,
        required:true,
        unique:true
       },

    name:
         {
        type:String,
        required:true
         }
   
       
},{
    timestamps:true
});


const UserPatient=mongoose.model('UserPatient',userSchema);

module.exports=UserPatient;