const listing = require("../models/listing.js")

const axios = require("axios")

module.exports.index = async (req, res) => {
    let allListings = await listing.find({})
    res.render("listing/index.ejs", {allListings})
}

module.exports.renderNewForm = async (req, res) => {
    res.render("listing/new.ejs")
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params
    let foundListing = await listing.findById(id).populate({path : "reviews", populate : {path : "author"}}).populate("owner")
    if (!foundListing) {
        req.flash("error", "Listing you requested does not exist!")
        return res.redirect("/listings")
    }
    console.log(foundListing)
    res.render("listing/show.ejs", {foundListing})
}

module.exports.createListing = async (req, res, next) => {
    const location = req.body.listing.location;

    const geoResponse = await axios.get(
        `https://api.maptiler.com/geocoding/${location}.json?key=${process.env.MAP_token}`
    );
    
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    if(req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    if (!geoResponse.data.features || geoResponse.data.features.length === 0) {
        req.flash("error", "Invalid location provided!");
        return res.redirect("/listings/new"); // Must return here!
    }
    newListing.geometry = geoResponse.data.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing created successfully!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    let listingToEdit = await listing.findById(id);
    if (!listingToEdit) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    let originalImageURL = listingToEdit.image.url;
    originalImageURL = originalImageURL.replace("/upload", "/upload/w_250");
    res.render("listing/edit.ejs", {listingToEdit, originalImageURL});
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let updatedListing = await listing.findByIdAndUpdate(id, {
        ...req.body.listing
    })

    if (req.body.listing.location) {
        const geoResponse = await axios.get(
            `https://api.maptiler.com/geocoding/${req.body.listing.location}.json?key=${process.env.MAP_token}`
        );
        if (geoResponse.data.features && geoResponse.data.features.length > 0) {
            updatedListing.geometry = geoResponse.data.features[0].geometry;
        }
    }

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {url, filename};
        await updatedListing.save();
    }
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing has been deleted successfully!");
    res.redirect("/listings");
}