const mongoose=require("mongoose");
//connecting the database
mongoose.connect('mongodb://127.0.0.1:27017/RegDb_assignment',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})