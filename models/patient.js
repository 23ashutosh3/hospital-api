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
         },
    doctor:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDoctor'
        },

    reports: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }]
   
       
},{
    timestamps:true
});


const UserPatient=mongoose.model('UserPatient',userSchema);

module.exports=UserPatient;