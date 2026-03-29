const express = require("express");
const router = express.Router();
const {isLoggedIn,isOwner} =require("../middleware");
const { upload, cloudinary } = require("../cloudServices/Cloudinary");


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
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),   // 👈 multer middleware
  createListing
);

// SHOW
router.get("/:id", showListing);

// EDIT FORM
router.get("/:id/edit",isLoggedIn,isOwner, editListingForm);

// UPDATE
router.put("/:id",isLoggedIn,isOwner, upload.single("listing[image]"),editListing);

// DELETE
router.delete("/:id",isLoggedIn,isOwner, destroyListing);
module.exports = router;