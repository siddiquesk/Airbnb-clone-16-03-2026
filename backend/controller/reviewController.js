const Listing = require("../model/Listing");
const Review = require("../model/Review");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");

// ================= CREATE REVIEW =================
module.exports.createReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError("Listing not found", 404);
    }

    const newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created Successfully");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};

// ================= DELETE REVIEW =================
module.exports.deleteReview = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;

    const listing = await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: new mongoose.Types.ObjectId(reviewId) },
    });

    if (!listing) {
      throw new ExpressError("Listing not found", 404);
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      throw new ExpressError("Review not found", 404);
    }

    req.flash("error", "Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};