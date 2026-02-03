const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const globalErrorHandler = require('./Controller/errorController');
const AppError = require('./utils/appError');

const authRoutes = require('./routes/auth-routes');
const productRoutes = require("./routes/product-routes")
const imagRoutes = require("./routes/image-routes");
const homeRoute = require("./routes/home-routes");
const userRoutes = require("./routes/user-routes");
const customerRoutes = require("./routes/customer-routes");
const clearanceRoute = require("./routes/clearance-route");


const app = express();

app.use(cookieParser());

app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods : ["GET","POST","DELETE","PUT"],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
        ],
        credentials: true,
    })
);

app.use(express.json({ limit: "10kb" }));

app.use('/api/auth', authRoutes);
app.use("/api/product",productRoutes);
app.use("/api/image",imagRoutes);
app.use("/api/home",homeRoute);
app.use("/api/user",userRoutes);
app.use("/api/customer",customerRoutes);
app.use("/api/clearance",clearanceRoute);



app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

const connectToDB = require('./Data-Base/db');

connectToDB();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});