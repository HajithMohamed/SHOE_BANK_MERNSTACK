const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        artNo:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        brand:{
            type:String,
            required:true,
            trim: true,
        },
        size:{
            type:Number,
            required:true,
            trim: true,
        },
        category:{
            type:String,
            required:true,
            trim:true,
            enum:[Gents, Ladies, Kids, boys, girls]
        },
        color:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
            trim:true,
        },
        stock:{
            type:Number,
            required:true,
            trim:true
        },
        productPic:{

        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },{ timestamps: true });

module.exports=mongoose.model("Product",productSchema);