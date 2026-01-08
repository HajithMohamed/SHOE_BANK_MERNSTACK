const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAync");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,"Uploads/");
    },
    filename: function(req,file,cb){
        cb(null,
            file.fieldname+ "_"+Date.now()+path.extname(file.originalname)
        )
    }
})

const checkFileFilter = catchAsync(async(req,file,next)=>{
    if(file.mimeType.startsWith('image')){
        next(null,true);
    }else{
        next(new AppError("Not an image"))
    }
})

module.exports=multer({
    storage:storage,
    fileFilter:checkFileFilter,
    limits:{
        fileSize:5*1024*1024,
    },
})