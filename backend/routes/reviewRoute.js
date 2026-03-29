const express = require("express");
const router = express.Router({ mergeParams: true });

const { createReview, deleteReview } = require("../controller/reviewController");
const { validateReview,isLoggedIn,isAuthor } = require("../middleware");

router.post("/",isLoggedIn,validateReview, createReview);
router.delete("/:reviewId",isAuthor, deleteReview);

module.exports = router;