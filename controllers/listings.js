const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  // .populate({ path: "reviews", populate: { path: "author" } }) // Nested polpulating
  // .populate("owner");
  //  res.send("working");
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  // console.log(req.params);
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } }) // Nested polpulating
    .populate("owner");
  if (!listing) {
    req.flash("error", "The requested listing doesnot exist!");
    res.redirect("/listings");
  }
  // res.send("Working");
  res.render("listings/show.ejs", { listing });
};

module.exports.creataNewListing = async (req, res, next) => {
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  // console.log(response);
  // console.log(response.body.features[0].geometry);
  // res.send("Got Coordinates");

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "..", filename);
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing has been Added");
  // res.send("Added Successfully");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The requested listing doesnot exist!");
    res.redirect("/listings");
  }

  // for Original image preview
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/h_100,w_200,c_fill"
  );
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  // if (!req.body.listing) {
  //   throw new ExpressError(400, "Send a valid Data or Information");
  // }
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { runValidators: true }
  );

  // console.log(listing.geometry.length);
  if (typeof listing.geometry.length === "undefined") {
    listing.geometry = response.body.features[0].geometry;
    await listing.save();
  }
  // console.log(response.body.features[0].geometry);
  // console.log(listing.geometry);

  // for image update if exsist
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing has been Edited");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing has been Deleted");
  res.redirect("/listings");
};
