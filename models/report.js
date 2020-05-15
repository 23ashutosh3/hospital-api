const mongoose=require('mongoose');

const reportSchema=new mongoose.Schema({

    status:
       {
        type:String,
        required: true

       },

       date:
        { type: Date, 
          default: Date.now 
        },

        doctor:
         {
          type:mongoose.Schema.Types.ObjectId,
          ref:"Doctor",
        
         },

         patient:
         {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Patient",
           
 
         }
   
       
},{
    timestamps:true
});


const Report=mongoose.model("Report",reportSchema);

module.exports=Report;