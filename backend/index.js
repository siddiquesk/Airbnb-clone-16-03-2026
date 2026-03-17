const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8080;
const path = require("path");
const Listing = require("./model/Listing.js");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");

app.engine("ejs",ejsMate);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const main = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

//All Listings
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//Listings Form
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show Individual Listing
app.get("/listings/:id", async (req, res) => {
  const listingId = req.params.id;
  const singleListings = await Listing.findById(listingId);
  res.render("listings/show.ejs", { listing: singleListings });
});

//post Listing
app.post("/listings", async (req, res) => {
  let listing = req.body.listing;
  console.log(listing);
  let createListing = new Listing(listing);
  await createListing.save();
  res.redirect("/listings");
});

//edit form route
app.get("/listings/:id/edit", async (req, res) => {
  const listingId = req.params.id;
  const editListing = await Listing.findById(listingId);
  res.render("listings/edit.ejs", { editListing });
});

//Update Listing
app.put("/listings/:id", async (req, res) => {
  const id = req.params.id;
  const updateListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/listings/${id}`);
});

//Delete Listing
app.delete("/listings/:id", async (req, res) => {
  const id = req.params.id;
  const deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listings");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  main();
});
