const express = require("express")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser({credentials : true}))

app.get("/",(req,res)=>{
    res.json({
        "message" : "this is a testing msg"
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`Server running at port ${process.env.PORT}`);  
})
