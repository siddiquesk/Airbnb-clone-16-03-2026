const User = require("../model/User");

// ================= SIGNUP FORM =================
const register = (req, res) => {
  res.render("users/signup.ejs");
};

// ================= SIGNUP LOGIC =================
const signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
     req.login(registeredUser,(err) => {
    if (err) return next(err);
   req.flash(
      "success",
      `Welcome ${registeredUser.username}! Your account has been created successfully.`
    );
    res.redirect("/listings");
  })
   

  } catch (err) {
    // 🔴 Duplicate username / email
    if (err.name === "UserExistsError") {
      req.flash("error", "Username already exists. Please choose another one.");
    } else {
      req.flash("error", err.message);
    }
    res.redirect("/signup");
  }
};

// ================= LOGIN FORM =================
const loginUser = (req, res) => {
  res.render("users/login.ejs");
};

// ================= LOGIN SUCCESS =================
const login = (req, res) => {
  req.flash(
    "success",
    `Welcome back ${req.user.username}! You are successfully logged in.`
  );
  let redirectUrl =res.locals.redirectUrl || "/listings"
  res.redirect(redirectUrl);
};


const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "👋 You have been logged out successfully.");
    res.redirect("/listings");
  });
};

module.exports = {
  register,
  signup,
  loginUser,
  login,
  logout,
};