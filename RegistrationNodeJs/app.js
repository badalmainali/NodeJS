const exp = require('constants');
const express=require('express');
const app=express();

require('./Database/db')
const userRoute=require('./Route/userRoute');
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));


app.use(userRoute);
app.listen(90);