import jwt from "jsonwebtoken";
import {Users} from "../Model/login.js";

async function Aunthentication(req,res,next){
   
    const {authorization}= req.headers;
    // console.log(req.headers);
    // console.log(authorization);
    try {
        
     
        if(!authorization){
            return  res.status(404).json({
               sucess:"false",
               messgae:"login first "
             })

        }

        const decoded=  jwt.verify(authorization,process.env.jwt_secret);
       req.user=await Users.findById(decoded._id);
        next();
        
    } catch (error) {
        console.log(error)
    }


}

export default  Aunthentication;