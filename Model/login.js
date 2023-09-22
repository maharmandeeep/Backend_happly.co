import mongoose from "mongoose";

const Schema= new mongoose.Schema({

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

export const Users= mongoose.model("users",Schema);