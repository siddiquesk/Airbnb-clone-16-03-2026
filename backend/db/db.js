const mongoose = require("mongoose");


const connectDb=async()=>{
try{
  const conn = await mongoose.connect(
    "mongodb://127.0.0.1:27017/wonderlust"
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
}catch(err){
  console.log(err);
}
}


module.exports = connectDb;