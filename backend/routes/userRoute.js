const express = require("express");
const router = express.Router();
const passport = require("passport");
const {savedUrl} =require("../middleware");
const {
  register,
  signup,
  loginUser,
  login,
  logout
} = require("../controller/userController");

// SIGNUP
router.get("/signup", register);
router.post("/signup", signup);

// LOGIN FORM
router.get("/login", loginUser);

// LOGIN LOGIC ✅
router.post(
  "/login",
  savedUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login   // ✅ controller
);

router.get("/logout",logout);

module.exports = router;