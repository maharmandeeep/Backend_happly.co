import { Token_making } from "../Middleware/token_making.js";
import { generateDeanSessions } from "../Model/Dean_session.js";
import { Users } from "../Model/login.js";
import { DeanSession } from "../Model/Dean_session.js";

//for registor student and dean
async function Registor(req, res, next) {
  try {
    const { university_ID, Password, Role, Name } = req.body;

    let user = await Users.findOne({ university_ID });

    if (user) return next(new Error("this university_id already present"));

    user = await Users.create({
      university_ID,
      Password,

      Name,
    }).then(
      res.status(200).json({
        success: "true",
      })
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//login api
async function Login(req, res, next) {
  try {
    const { university_ID, Password } = req.body;

    const user = await Users.findOne({ university_ID });

    if (!user) return next(new Error("No record  found of this Id"));

    if (user.Password != Password) {
      return next(new Error("Wrong password"));
    }

    //makin token
    Token_making(user, res);
  } catch (error) {
    next(error);
  }
}

///ading session function is creating here
async function Adding_session() {
    try {
        const lastDocument = await DeanSession.find()
        .sort({ _id: -1 }) // Assuming you are using ObjectId as the primary key
        .limit(1)
        .exec();

    console.log(lastDocument);

    const sessions = [];
    const currentDate = new Date(lastDocument[0].date);
    for (let i = 1; i < 14; i++) {
      const nextDate = new Date(currentDate );
      nextDate.setDate(currentDate.getDate() + i );
      nextDate.setHours(10, 0, 0, 0); // Set to 10 AM
      if (nextDate.getDay() === 4 || nextDate.getDay() === 5) {
        // Thursday or Friday
        sessions.push({
          date: nextDate,
          availability: 'Available',
          student: null, 
        });
      }
    }

    console.log(sessions);
  
    // Insert generated sessions into the database
    DeanSession.insertMany(sessions)
      .then(() => {
        console.log('Generated and inserted dean sessions.');
      })
      .catch((error) => {
        console.error('Error inserting dean sessions:', error);
      });
        
    } catch (error) {
        console.log(error);
    }
  
}

//api for fetch list of free session
async function List_0f_free_session(req, res, next) {
    // generateDeanSessions();



  try {
    const sessions = await DeanSession.find({ availability: "Available" });

    // if(!sessions) return(new Error("their is no sessionn is  available "))

    if (sessions.length === 0) {
      await Adding_session();
    }

    const sessionsJSON = sessions.map((session) => ({
      date: session.date,
      availability: session.availability,
    }));
    //   console.log(req.user);

    res.json(sessionsJSON);
  } catch (error) {
    next(error);
  }
}

//book a session
async function Book_session(req, res, next) {
  const { session_id } = req.body;

  try {
    const session = await DeanSession.findById(session_id);

    if (!session) return new Error("no session is found");

    if (session.availability === "Available") {
      session.availability = "Booked";
      session.student = req.user._id;
      await session.save();

      return res.status(200).json({ message: "Session booked successfully." });
    } else {
      return res
        .status(400)
        .json({ message: "Session is not available for booking." });
    }
  } catch (error) {
    next(error);
  }
}

export { Login, Registor, List_0f_free_session, Book_session };
