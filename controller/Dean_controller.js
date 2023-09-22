import { DeanSession } from "../Model/Dean_session.js";
import { Users } from "../Model/login.js";
import { DeanLogin} from "../Model/Dean_session.js"
import { Token_making } from "../Middleware/token_making.js";


async function Login(req,res,next){
  try {
      
  const {university_ID,Password}=req.body;

  const user= await DeanLogin.findOne({university_ID});


  if(!user) return next(new Error("No record  found of this Id"));

  if(user.Password != Password){
      return next(new Error("Wrong password"));
  }
 
 

  //makin token 
 Token_making(user,res);
 
      
  } catch (error) {
      next(error)
  }



}




async function Pending_session(req, res, next) {
  try {
   
    const currentDateTime = new Date();

   
    const pendingSessions = await DeanSession.find({
      availability: "Booked",
      date: { $gte: currentDateTime.toISOString() }, 
    }).populate("student"); 

   
    const pendingSessionsList = [];
    // console.log(pendingSessions);
    // res.send("sucess");

   
    for (const session of pendingSessions) {
      if (session.student) {
        pendingSessionsList.push({
          studentName: session.student.Name, 

          date_and_time: session.date,
        });
      }
    }

   
    res.status(200).json(pendingSessionsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default Pending_session;
export {Login};
