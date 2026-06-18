const express = require("express");
const router = express.Router({mergeParams:true});

const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const{validationReview,isLoggedIN, isReviewaAuthor} = require("../middleware.js");

const reviewController = require('../controllers/reviews.js');

router.post("/",isLoggedIN,validationReview, reviewController.postReview )

router.delete("/:reviewID",isLoggedIN,isReviewaAuthor, reviewController.distroyReview);

module.exports = router;