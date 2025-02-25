const User = require("../models/user");
const Listing = require("../models/listing");

module.exports.renderSinupForm = (req, res) => {
  res.render("users/signup.ejs");
  //   console.log("working");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    let registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WonderLust");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    //   console.log(err);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to WonderLust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  // console.log(redirectUrl);
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next();
    }
    req.flash("success", "You logged out successfully");
    res.redirect("/listings");
  });
};

module.exports.search = async (req, res) => {
  let { query } = req.query;
  let allListings = await Listing.find({});
  // let allListings = await Listing.findOne({location:"Goa"});
  // console.log(query,"..",allListings.location);
  res.render("listings/searched.ejs", { query, allListings });
  // res.send("working");
};
