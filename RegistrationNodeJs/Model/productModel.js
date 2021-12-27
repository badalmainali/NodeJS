const mongoose=require("mongoose");

const Product=mongoose.model('Product',{
    pname:{
        type: String
    },
    ptype:{
        type: String
    },
    markedprice:{
        type: String
    },
    sellingprice:{
        type: String
    },
    


})