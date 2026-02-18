const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Product = require("../Models/Product");
const Customer = require("../Models/Customer");
const Bill = require("../Models/Bill");
const Counter = require("../Models/Counter");


const generateInvoiceNumber = async(session)=>{
    const generateInvoiceNumber = async (session) => {
    const year = new Date().getFullYear();

    const counter = await Counter.findOneAndUpdate(
        { name: `invoice-${year}` },  
        { $inc: { sequence: 1 } },
        { new: true, upsert: true, session }
    );

    const formattedSequence = String(counter.sequence).padStart(5, "0");

    return `INV-${year}-${formattedSequence}`;
    };

}