const express=require("express");
const bcryptjs = require('bcryptjs');

//jwt helps to create token
const jwt = require('jsonwebtoken');
const User = require("../Model/userModel");
const auth=require("../auth/auth");
const upload=require('../files/file');

const router=new express.Router();


// router.post('/user/register',function(req,res){
//     //individually taneko so that we can modify them easily
//     const username=req.body.username;
//     const password=req.body.password;
//     const email=req.body.email;
//     //model create garne ani yah mathi tanera tei model yo line ma new saga use garne
//     const userData=new User({
//         username:username,
//         password:password,
//         email:email
//     }) 
//     userData.save();
// })
router.post("/user/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const fullname=req.body.fullname;

    const email = req.body.email;
    const age=req.body.age;
    const address=req.body.address;
    const phone=req.body.phone
    const image=req.body.image
   
    User.findOne({
        username: username
    }).then(function (userData) {
        if (userData !== null) {
            res.status(401).json({ msg: "username xa ahi yeha" })
        }
        else {
            bcryptjs.hash(password, 10, function (e, hash_password) {
                const userData = new User({
                    username: username,
                    password: hash_password,
                    fullname:fullname,
                    email: email,
                    age:age,
                    address:address,
                    phone:phone,
                    image:image
                   
                })
                userData.save();
            })
        }
        // bcryptjs.hash(password, 10, function (e, hash_password) {
        //     const customeData = new Customer({
        //         username: username,
        //         password: hash_password,
        //         email: email,
        //         address: address
        //     })
        //     customeData.save();
        // })
    })

})

//router for login customer
router.post("/user/login", function (req, res) {
    const username = req.body.username;
    User.findOne({ username: username })
        .then(function (userData) {
            if (userData == null) {
                return res.json({ message: 'Invalid Login Credintials'})
            }
            // it mean username is valid
            const password = req.body.password;
            // console.log(password);
            bcryptjs.compare(password, userData.password, function (e, result) {
                if (result == false) {
                    return res.json({ message: "Invalid Login Credintails" })
                }
                // in this case both username and password matched and we should have to create new token
                const token = jwt.sign({ userId: userData._id }, "skey");
                res.json({ token: token, message: 'Auth Success!'});
            })
        })
        .catch()
})

router.delete("/user/delete",auth.verifyCustomer,function(req,res){
    res.json({msg:"Test Done yoooooo!"});
})

//for image upload use this route, this is for references
router.post("/user/profile",upload.single('user_image'),function(req,res){
    // console.log(req.file);
if(req.file==undefined){
    //if invalid
    return res.json({
        message:"Invalid File Format"
    })
}
else{
const user=new User({
    image:req.file.filename
})
}


})

//view profile by USers-dashboard
router.get('/user/me',auth.verifyCustomer,function(req,res){
    // console.log(req.userInfo,'hhhhhhh');  //auth.js ko guard bata logged vaisakya user ko data taanne
    res.json({
        //json format ma esari client ko dashboard ma pathai diney
        email: req.userInfo.email,
        fullname: req.userInfo.fullname,
        phone: req.userInfo.phone,
        age: req.userInfo.age,
        address: req.userInfo.address,
        image: req.userInfo.image

    });
})

//profile update
router.put("/user/update/",auth.verifyCustomer, function(req,res){
    
    const username=req.body.username;
    const email=req.body.email;
    User.updateOne({_id:req.userInfo._id},{
        username:username,
        email:email
    })
    .then(
        res.json({msg:"Updated Successfully"})
    )
    .catch()

})
module.exports=router;