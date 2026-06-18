const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const  {listingSchema,reviewShema} = require("./schema.js");
const ExpressError = require("./Utils/ExpressError.js");

module.exports.isLoggedIN = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // console.log(req);
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be login is to create Listing!");
        return res.redirect("/user/login");
    }
    next(); 
};

module.exports.saveRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner =async (req,res,next)=>{
    let {id} = req.params;
    let listingId = await Listing.findById(id);
    if(!listingId.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not Listing Onwer!");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validationListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};
module.exports.validationReview = (req, res, next) =>{
    let {error} = reviewShema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};
module.exports.isReviewaAuthor =async (req, res, next) =>{
    let {reviewID,id} = req.params;
    let review = await Review.findById(reviewID);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You did not create Reviews!");
        return res.redirect(`/listing/${id}`);
    }
    next();
};