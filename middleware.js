const listing = require("./models/listing");
const reviews = require("./models/reviews.js")
const {listingSchema} = require("./schema.js")
const {reviewsSchema} = require("./schema.js")
const ExpressError = require("./utils/ExpressError.js")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to do that!")
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params
    let listingToEdit = await listing.findById(id)
    if(!listingToEdit) {
        req.flash("error", "Listing you requested does not exist!")
        return res.redirect("/listings")
    }
    if(!listingToEdit.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing!")
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errorMessage = error.details.map(el => el.message).join(",")
        throw new ExpressError(400, errorMessage)
    } else{
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let {error} = reviewsSchema.validate(req.body)
    if (error) {
        let errorMessage = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errorMessage)
    } else{
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params
    let review= await reviews.findById(reviewId);

    if (!review) {
        req.flash("error", "Review no longer exists!");
        return res.redirect(`/listings/${id}`);
    }
    
    if(!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!")
        return res.redirect(`/listings/${id}`)
    }
    next();
}