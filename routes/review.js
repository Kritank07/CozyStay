const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const listing = require("../models/listing.js")
const reviews = require("../models/reviews.js")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")

// Reviews route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete Review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;