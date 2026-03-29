const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/Listing.js");

const main = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

const initDb = async () => {
  await Listing.deleteMany({});

  for (let data of initData.data) {
    data.owner = new mongoose.Types.ObjectId("69c94897656b407a3bf40c03");
    const listing = new Listing(data);
    await listing.save();
  }

  console.log("Database initialized with sample data");
  mongoose.connection.close();
};

main().then(initDb);