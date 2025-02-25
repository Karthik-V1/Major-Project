const express = require("express");
const router = express.Router();
// const Listing = require("../models/listing.js"); used this in controllers (listings.js)
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js"); used this in controllers (listings.js)
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

// Index Route and create Route

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.creataNewListing)
  );

// New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

// Show Route, Update Route and Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.updateListing)
// );

// Delete Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.destroyListing)
// );

module.exports = router;
