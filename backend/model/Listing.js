const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stayOptions = ["Night", "2 Days", "3 Days", "2 Nights", "4 Nights"];

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
   url:String,
   filename:String,
  },
  price: Number,

  // ✅ stayType properly defined
  stayType: {
    type: String,
    enum: stayOptions,
  },

  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

// ✅ middleware: auto-assign random stayType
listingSchema.pre("save", function () {
  if (!this.stayType) {
    const randomIndex = Math.floor(Math.random() * stayOptions.length);
    this.stayType = stayOptions[randomIndex];
  }
});

module.exports = mongoose.model("Listing", listingSchema);