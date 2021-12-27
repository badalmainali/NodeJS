const mongoose=require('mongoose');

const User=mongoose.model('User',{
    username:{
        type:String
    },
    password:{
        type:String
    },
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    image:{
        type: String
    }
})
//exporting
module.exports=User