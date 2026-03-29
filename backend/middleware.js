const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./joi/Schema");
const Listing =require("./model/Listing");
const Review =require("./model/Review");

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(errMsg, 400);
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(errMsg, 400);
  }
  next();
};

const isLoggedIn =async(req,res,next)=>{
  try{
    if(!req.isAuthenticated())
    {
      req.session.redirectUrl=req.originalUrl;
       req.flash("error", "You Must be Logged in");
       return res.redirect("/login");
    }
    next();
  }catch(err){
   next(err);
  }
}

const savedUrl =(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

const isOwner =async(req,res,next)=>{
  try{
      const {id}= req.params;
     const listing = await Listing.findById(id);
   if (!listing.owner || !listing.owner._id.equals(req.user._id)) {
      req.flash("error", "You are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
  }catch(err){

  }
}

const isAuthor =async(req,res,next)=>{
  try{
      const {id,reviewId}= req.params;
     const review = await Review.findById(reviewId);
   if (!review.author || ! review.author._id.equals(req.user._id)) {
      req.flash("error", "You are not the owner of this review");
      return res.redirect(`/listings/${id}`);
    }
    next();
  }catch(err){

  }
}

module.exports = {
  validateListing,
  validateReview,
  isLoggedIn,
  savedUrl,
  isOwner,
  isAuthor,
};