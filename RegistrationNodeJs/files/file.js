//npm i multer
//this helps in uploading the file system
const multer=require('multer');

//file upload with destination and image upload
//storage pani declare gardine for file upload
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './Images')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)  //img replace na hoss vanera date.now concadinate gardine ani jati choti ni halda hunxa
    }
})

//checking the file format i.e. filtering
const filter=function(req,file,cb){

  if (file.minetype=="image/jpeg" || file.minetype=='image/png'){
      //correct fromat
      cb(null,true)
  }
  else{
      //incorrect format
      cb(null,false)
  }
}

const upload=multer({
    storage:storage,
    fileFilter:filter
})

module.exports=upload