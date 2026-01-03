const mongoose = require("mongoose");

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
        }
},{timestamps : true});

model.exports = mongoose.model("Image",imageSchema);