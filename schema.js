const Joi = require('joi'); // for schema validation (server side)
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        image : Joi.string().allow('', null),
        price : Joi.number().required().min(0),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
    }).required()
});

module.exports.reviewsSchema = Joi.object({
    review : Joi.object ({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required()
    }).required()
})
