import mongoose from "mongoose";


export  const database_connect=()=>{mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName:"Happly_database"
}).then(()=>{
    console.log("database is  connected");
}).catch((e)=>{
    console.log(e);
})}