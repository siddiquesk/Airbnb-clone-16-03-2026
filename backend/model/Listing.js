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
    type: String,
    default:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1606989254570-02aa0d7ea083?w=500&auto=format&fit=crop&q=60"
        : v,
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
  ]
});

// ✅ middleware: auto-assign random stayType
listingSchema.pre("save", function () {
  if (!this.stayType) {
    const randomIndex = Math.floor(Math.random() * stayOptions.length);
    this.stayType = stayOptions[randomIndex];
  }
});

module.exports = mongoose.model("Listing", listingSchema);