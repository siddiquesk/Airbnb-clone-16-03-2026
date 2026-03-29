const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const MemoryStore = require("memorystore")(session); // ✅ Use MemoryStore instead of MongoStore

const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./model/User.js");
const flash = require("connect-flash");

// Routes & DB
const listingRoute = require("./routes/listingRoute");
const reviewRoute = require("./routes/reviewRoute");
const userRoute = require("./routes/userRoute");
const basicSearch = require("./routes/searchRoute.js");
const connectDb = require("./db/db");

// ================= PORT =================
const PORT = process.env.PORT || 3000;

// ================= VIEW ENGINE =================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= MIDDLEWARES =================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

// ================= SESSION + MEMORYSTORE =================

// Create session store
const store = new MemoryStore({
  checkPeriod: 7 * 24 * 60 * 60 * 1000, // prune expired entries every 7 days
});

// Configure session middleware
app.use(
  session({
    store, // use MemoryStore
    name: "session", // optional, default is 'connect.sid'
    secret: process.env.SESSION_SECRET || "keyboard-cat",
    resave: false,
    saveUninitialized: false, // only save session when something is stored
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);



// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================= FLASH LOCALS =================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ================= ROUTES =================
app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute);
app.use("/", basicSearch);

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("listings/error.ejs", { status, message });
});

// ================= SERVER =================
app.listen(PORT, () => {
  connectDb(); // make sure connectDb() connects to Atlas
});