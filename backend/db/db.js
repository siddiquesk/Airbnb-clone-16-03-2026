const mongoose = require("mongoose");

const DB=process.env.ATLAS_DB
const connectDb=async()=>{
try{
   await mongoose.connect(DB);
}catch(err){
  console.log(err);
}
}


module.exports = connectDb;