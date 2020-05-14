const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

    status:
       {
        type:String,
        required: true

       
       },

       date:
        { type: Date, 
          default: Date.now 
        },

        Doctor:
         {
          type:mongoose.Schema.Types.ObjectId,
          ref:'UserDoctor',
          required:true
         },

         patient:
         {
           type:mongoose.Schema.Types.ObjectId,
           ref:'UserPatient',
           required:true
 
         }
   
       
},{
    timestamps:true
});


const UserReport=mongoose.model('UserReport',userSchema);

module.exports=UserReport;