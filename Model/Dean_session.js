import mongoose from "mongoose";
import { Users } from "./login.js";


export const DeanLogin=mongoose.model('Dendata',{
  Name:{
    type:String,
  },
  university_ID :{
      type : String,
      required :true,
  },

  Password:{
      type :String,
      required :true,
  }
  
})

export const DeanSession = mongoose.model('DeanSession', {
    date: Date,
    availability: String,
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  });




 export  function generateDeanSessions() {
    // Your logic to generate session records here
    // For example, generate sessions for the next 30 days on Thursdays and Fridays at 10 AM
    const sessions = [];
    const currentDate = new Date();
    for (let i = 0; i < 30; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i -6);
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
  
    // Insert generated sessions into the database
    DeanSession.insertMany(sessions)
      .then(() => {
        console.log('Generated and inserted dean sessions.');
      })
      .catch((error) => {
        console.error('Error inserting dean sessions:', error);
      });
  }


  