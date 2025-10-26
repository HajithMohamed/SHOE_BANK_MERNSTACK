const mongoose = require("mongoose")
const validator = require('validator');


const userSchema = new mongoose.Schema({
    email :{
        type: String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
        validate :[ validator.isEmail,"please provide an valid email"]
    },
    password :{
        type: String,
        required : true,
        trim : true,
        minlength:8,
        select : false
    },
    role : {
        type : String,
        enum : ["admin",'user'],
        default : 'user'
    },isVerified : {
        type : Boolean,
        default : false,
    },
    otp : {
        type : String,
        default : null
    },
    otpExpires : {
        type : Date,
        default : null,
    },
    resetPasswordOtp : {
        type : String,
        default : null
    },
    resetPasswordOtpExpires : {
        type : Date,
        default : null,
    },
    resetPasswordOtpVerify : {
        type : Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
},{timestamp:true})

module.exports = mongoose.model("User",userSchema)





