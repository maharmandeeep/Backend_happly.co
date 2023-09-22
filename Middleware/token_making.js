import jwt from "jsonwebtoken";


export function Token_making(user,res,next){

   try {
    const token=jwt.sign({_id:user._id},process.env.jwt_secret);
   
     const role=user.Role;
   res.status(200).header("Authorization",`Bearer ${token}`).json({
    success:"true",
    message:"successfully login and make a bearer token ",
   })
    
   } catch (error) {
     next(error)
   }
}