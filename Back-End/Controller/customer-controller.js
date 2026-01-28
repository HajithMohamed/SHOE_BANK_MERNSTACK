const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Customer = require("../Models/Customer");

const addCustomer = catchAsync(async(req, res, next)=>{
    const {name, shopName, mobileNo, address, email, accountNo} = req.body;

    if(!name && !shopName && !mobileNo && !address && !email && !accountNo ){
        return next(new AppError("All fields are required",400));
    }

    const existCustomer = await Customer.findOne({shopName});

    if(existCustomer){
        return next(new AppError("This customer already exist",400));
    }

    const newCustomer = new Customer({
        name,
        shopName,
        mobileNo,
        address,
        email,
        accountNo
    });

    await newCustomer.save();

    res.status(200).json({
        success : true,
        message : "New customer is crearted successfully",
        data : newCustomer
    });

});

const getAllCustomer = catchAsync(async(req, res, next)=>{
    const customers = await Customer.find({});

    if(!customers && customers.length==0){
        return next(new AppError('No customers found',404));
    }

    res.status(200).json({
        success : true,
        message : 'All customers are fetched successfully',
        length : customers.length,
        data : customers
    });
})


const getSingleCustomer = catchAsync(async(req, res, next)=>{
    const customerID = req.params.customerID;

    if(!customerID){
        return next(new AppError('Customer id is reaquired',400));
    }

    const singleCustomer = await Customer.findById(customerID);

    if(!singleCustomer){
        return next(new AppError(`The customer with ${customerID} is not found`));
    }

    res.status(200).json({
        success : true,
        message : 'Customer found',
        data : singleCustomer
    })
})

const updateCustomer = catchAsync(async(req, res, next)=>{
    const customerID = req.params.id;

    const allowedFields = ["name","shopName","address","mobileNo","email","accountNo"]

    const updates = {}

    Object.keys(req.body).forEach((key)=>{
        if(allowedFields.includes(key)){
            updates[key] = req.body[key]
        }
    })

    if(Object.keys(updates).length===0){
        return next(new AppError('No valid fields to update',404));
    }

    const updateCustomer = await Customer.findByIdAndUpdate(customerID, updates, {
        new : true,
        runValidators : true
    })

    if (!updatedUser) {
        return next(new AppError("Customer not found", 404));
    }

  res.status(200).json({
    status: "success",
    message: "Customer updated successfully",
    data: { customer: updateCustomer }
  });
})

const deleteCustomer = catchAsync(async(req, res, next)=>{
    const customerID = req.params.id;

    const deleteCustomer = await Customer.findByIdAndDelete(customerID);

    if(!deleteCustomer){
        return next(new AppError("Customer not found", 404));   
    }

    res.status(200).json({
    status: "success",
    message: "Customer deleted successfully",
    data: { customer: deleteCustomer }
  });
})

const getAllCustomerCount = catchAsync(async(req, res, next)=>{
    const customersCount = await Customer.countDocument;

    res.status(200).message({
        success : true,
        message : 'Customer Counts',
        data : customersCount
    })
})
module.exports = {
    addCustomer,
    getAllCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomerCount,
}
