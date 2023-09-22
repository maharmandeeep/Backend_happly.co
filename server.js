import express from "express";
import {database_connect} from './Database/database_connect.js';
import Student_router from "./Routes/user_route.js";
import { config } from "dotenv";
import routerdean from "./Routes/dean_route.js";




const app=express();

//dotenv config
config({
    path:"./config.env"
})

//connecting to data base
database_connect();


//useing middlwware
app.use(express.json());


//royter middleware 
app.use("/api/v1/student",Student_router);
app.use("/api/v1/dean",routerdean);


app.get("/",(req,res)=>{
    res.send("hello app m hu")
})






//listing on this port
app.listen(3000,()=>{
    console.log("server is working");
})