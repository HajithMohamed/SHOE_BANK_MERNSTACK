const mongoose = require("mongoose");
const Product = require("./Product");

const imageSchema = mongoose.Schema({
    url : {
            type : String,
            rquired : true,
        },
        publicId : {
            type : String,
            rquired : true,
        },
        uploadedBy : {
            type : mongoose.Schema.ObjectId,
            ref : "User"
        },
        productId:{
            type:mongoose.Schema.ObjectId,
            ref : "Product",
        }
},{timestamps : true});

model.exports = mongoose.model("Image",imageSchema);