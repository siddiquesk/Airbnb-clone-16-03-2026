const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./joi/Schema");

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
   console.log(err);
  }
}

const savedUrl =(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}

module.exports = {
  validateListing,
  validateReview,
  isLoggedIn,
  savedUrl,
};