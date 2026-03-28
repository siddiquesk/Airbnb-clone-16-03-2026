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

  // ✅ DO NOT use insertMany (middleware skip hota hai)
  for (let data of initData.data) {
    const listing = new Listing(data);
    await listing.save(); // pre("save") runs here
  }

  console.log("Database initialized with sample data");
  mongoose.connection.close();
};

main().then(initDb);