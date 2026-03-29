const express = require("express");
const router = express.Router();
const {searchBar,contacts}  = require("../controller/basicController");

router.get("/search", searchBar);
router.get("/contact", contacts);
module.exports = router;