if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
// const { error } = require("console");
// const joi = require("joi");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");
const catListingRouter = require("./routes/catListing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to mongo DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SCERET,
  },
  touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", () => {
  console.log("ERROR in MANGO SESSION STORE", err);
});

const sessionOptions = {
  store, // we can also write like store:store,
  secret: process.env.SCERET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// local middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/", catListingRouter);

// app.get("/", (req, res) => {
//   res.send("Hi i'm root");
// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went wrong" } = err;
  res.status(statusCode).render("./listings/error.ejs", { err });
});

app.listen(8080, () => {
  console.log("Listening to the port 8080");
});

// let listing1 = new Listing({
//   title: "Cozy Beachfront Cottage",
//   description:
//     "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//   price: 1200,
//   location: "Malibu",
//   country: "United States",
// });

// listing1
//   .save()
//   .then(() => {
//     console.log("Listing has been saved");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
