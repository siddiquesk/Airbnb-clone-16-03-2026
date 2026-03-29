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
    const listing = await Listing.findById(req.params.id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
   
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
    let url =req.file.path;
    let fileName =req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner =req.user._id;
    newListing.image={url,fileName};
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
    const {id}= req.params;
    const updatedListing = await Listing.findByIdAndUpdate(
     id,
      req.body.listing,
      { runValidators: true, new: true }
    );
    if(typeof req.file !=="undefined"){
    let url =req.file.path;
    let fileName =req.file.filename;
     updatedListing.image={url,fileName};
     await updatedListing.save()
    }
  
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