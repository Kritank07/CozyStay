const reviews = require("../models/reviews.js")
const listing = require("../models/listing.js")

module.exports.createReview = async (req, res) => {
    let {id} = req.params
    let listingDoc = await listing.findById(id);

    if (!listingDoc) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    
    let newReview = new reviews(req.body.review)
    newReview.author = req.user._id
    console.log(newReview)
    listingDoc.reviews.push(newReview)

    await newReview.save()
    await listingDoc.save()
    console.log("new review saved")
    req.flash("success", "New Review added successfully!")
    res.redirect(`/listings/${id}`)
}

module.exports.deleteReview = async (req, res) => {
    let {id, reviewId} = req.params;

    await listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}})
    await reviews.findByIdAndDelete(reviewId)

    req.flash("success", "Review has been deleted successfully!")
    res.redirect(`/listings/${id}`)
}