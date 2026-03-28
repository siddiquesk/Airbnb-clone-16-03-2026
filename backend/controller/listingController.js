const Listing = require("../model/Listing");
const ExpressError = require("../utils/ExpressError");

// ================= INDEX =================
const getListing = async (req, res, next) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    next(err);
  }
};

// ================= NEW FORM =================
const listingForm = (req, res, next) => {
  try {
    res.render("listings/new.ejs");
  } catch (err) {
    next(err);
  }
};

// ================= SHOW =================
const showListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("reviews");

    if (!listing) {
      throw new ExpressError("Listing Does Not Exist", 404);
    }

    res.render("listings/show.ejs", { listing });
  } catch (err) {
    next(err);
  }
};

// ================= CREATE =================
const createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();

    req.flash("success", "New Listing Created Successfully");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};

// ================= EDIT FORM =================
const editListingForm = async (req, res, next) => {
  try {
    const editListing = await Listing.findById(req.params.id);

    if (!editListing) {
      throw new ExpressError("Listing Not Found", 404);
    }

    res.render("listings/edit.ejs", { editListing });
  } catch (err) {
    next(err);
  }
};

// ================= UPDATE =================
const editListing = async (req, res, next) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body.listing,
      { runValidators: true, new: true }
    );

    if (!updatedListing) {
      throw new ExpressError("Listing Not Found", 404);
    }

    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

// ================= DELETE =================
const destroyListing = async (req, res, next) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);

    if (!deleted) {
      throw new ExpressError("Listing Not Found", 404);
    }

    req.flash("error", "Listing Deleted Successfully");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getListing,
  listingForm,
  showListing,
  createListing,
  editListingForm,
  editListing,
  destroyListing,
};