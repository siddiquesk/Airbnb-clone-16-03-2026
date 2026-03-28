const express = require("express");
const router = express.Router({ mergeParams: true });

const { createReview, deleteReview } = require("../controller/reviewController");
const { validateReview } = require("../middleware");

router.post("/", validateReview, createReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;