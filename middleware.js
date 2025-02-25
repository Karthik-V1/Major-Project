const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.path, "..", req.originalUrl);
  // console.log("req path:",req.path);
  // console.log("req origunalUrl:",req.originalUrl);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You need be logged in to perform this action");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// to varify the user loggedin is the owner of the listing or not (to give the access or permission or authorizatio to make changes)
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have the permission to perform this action");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Server end validation middleware function for New listing and Edit listing.
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // let result = listingSchema.validate(req.body); inside this result object the error is present.
  // console.log(result);
  // console.log(error);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Server end validation middleware function for Reviews.
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// to varify the user loggedin is the author of the Review or not (to give the access or permission or authorizatio to make changes)
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  console.log(review);
  // console.log(res.locals.currUser._id);
  // console.log(review.author._id);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have the perrmission to perform this action");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
