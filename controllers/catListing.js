const Listing = require("../models/listing");

module.exports.shipping = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Shipping";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.farms = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Farms";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.castels = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Castels";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.mountains = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Mountains";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.cities = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Cities";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.beach = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Beach";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.rooms = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Rooms";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.arctic = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Arctic";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.pools = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Pools";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.lakes = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Lakes";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};

module.exports.sunsets = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Sunsets";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};


module.exports.towers = async (req, res) => {
  let allListings = await Listing.find({});
  let category = "Towers";
  res.render("listings/subIndex.ejs", { category, allListings });
  // console.log("Working");
};