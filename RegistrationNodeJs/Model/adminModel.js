const mongoose=require('mongoose');

const Admin=mongoose.model('Admin',{
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    fullname:{
        type:String
    }
})

//exporting
module.exports=Admin