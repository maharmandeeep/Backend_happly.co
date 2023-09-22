import express from "express";
import Aunthentication from "../Middleware/auth.js";
import {Login} from "../controller/Dean_controller.js";
import Pending_session from "../controller/Dean_controller.js";



const routerdean=express.Router();

routerdean.post("/login",Login);

routerdean.get("/pending/session",Aunthentication,Pending_session);


export default routerdean;
