import express from "express";
import {Login,Registor,List_0f_free_session,Book_session} from "../controller/User_controller.js";
import Aunthentication from "../Middleware/auth.js";

const router=express.Router();

router.post("/login",Login);
router.post("/registor",Registor);
router.get("/List/session",Aunthentication,List_0f_free_session);
router.post("/Book/session",Aunthentication,Book_session);

export default router;
