const express = require("express");
const router = express.Router();
// const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const usersControllers = require("../controllers/users");
const Listing = require("../models/listing");

// Regitser User
router
  .route("/signup")
  .get(usersControllers.renderSinupForm)
  .post(wrapAsync(usersControllers.signup));

// Login User
router
  .route("/login")
  .get(usersControllers.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersControllers.login
  );

// router.get("/login", usersControllers.renderLoginForm);

// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   usersControllers.login
// );

// Logout User
router.get("/logout", usersControllers.logout);

module.exports = router;

// user search
router.get("/search",usersControllers.search);
