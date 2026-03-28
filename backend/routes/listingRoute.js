const express = require("express");
const router = express.Router();
const {isLoggedIn} =require("../middleware");
const {
  getListing,
  listingForm,
  showListing,
  createListing,
  editListingForm,
  editListing,
  destroyListing,
} = require("../controller/listingController");

// INDEX
router.get("/", getListing);

// NEW FORM
router.get("/new",isLoggedIn, listingForm);

// CREATE
router.post("/",isLoggedIn, createListing);

// SHOW
router.get("/:id", showListing);

// EDIT FORM
router.get("/:id/edit",isLoggedIn, editListingForm);

// UPDATE
router.put("/:id",isLoggedIn,editListing);

// DELETE
router.delete("/:id",isLoggedIn, destroyListing);

module.exports = router;