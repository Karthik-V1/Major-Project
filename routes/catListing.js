const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const catListingController = require("../controllers/catListing.js");

router.get("/shipping", wrapAsync(catListingController.shipping));
router.get("/farms", wrapAsync(catListingController.farms));
router.get("/castels", wrapAsync(catListingController.castels));
router.get("/mountains", wrapAsync(catListingController.mountains));
router.get("/cities", wrapAsync(catListingController.cities));
router.get("/beach", wrapAsync(catListingController.beach));
router.get("/rooms", wrapAsync(catListingController.rooms));
router.get("/arctic", wrapAsync(catListingController.arctic));
router.get("/pools", wrapAsync(catListingController.pools));
router.get("/lakes", wrapAsync(catListingController.lakes));
router.get("/sunsets", wrapAsync(catListingController.sunsets));
router.get("/towers", wrapAsync(catListingController.towers));

module.exports = router;
