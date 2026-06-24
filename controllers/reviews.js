const Listing = require('../models/listing.js');
const Review = require('../models/review.js');

module.exports.postReview = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; //set by the author to req.user;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "SuccessFul Created Review!");
    res.redirect(`/listing/${id}`);
}

module.exports.distroyReview = async(req,res)=>{
    let{id, reviewID} = req.params;
    let dr = await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewID}});
    let rid = await Review.findById(reviewID);
    req.flash("success", "SuccessFul Deleted Review!");
    res.redirect(`/listing/${id}`);
}
