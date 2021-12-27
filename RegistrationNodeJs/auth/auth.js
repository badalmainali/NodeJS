const jwt=require("jsonwebtoken");
const User=require("../Model/userModel");

module.exports.verifyCustomer=function(req,res,next){
    try {
        const token =req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token,'skey');
        // console.log(data);
        User.findOne({_id:data.userId})
        .then(function(result){
            console.log(result)
            //saving info of logged in user into userinfo
           req.userInfo=result;
           next()
    
        })
        .catch(function(){
            res.send({msg:"you don't exist here"})
        })
        
    } catch (error) {
        res.send({msg:"you don't exist here"})
    }
   
}