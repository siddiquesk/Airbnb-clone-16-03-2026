const express = require("express");
const router = express.Router();
const {searchBar,contacts,thankYou,About}  = require("../controller/basicController");

router.get("/search", searchBar);
router.get("/contact", contacts);
router.get("/thank-you", thankYou);
router.get("/about", About);
module.exports = router;