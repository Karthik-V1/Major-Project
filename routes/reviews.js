const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams preserve the req.params values from the parent router. if the parent and child have conflicting params name, the child's value take precedence.
// const Review = require("../models/reviews.js"); used this in controllers (reviews.js)
// const Listing = require("../models/listing.js"); used this in controllers (reviews.js)
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewsController = require("../controllers/reviews.js");

// Reviews
// post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewsController.createReview)
);

// Reviews Delete Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewsController.destroyReview)
);

module.exports = router;
