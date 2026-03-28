const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Title is required",
      }),

    description: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Description is required",
      }),

    location: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Location is required",
      }),

    country: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Country is required",
      }),

    price: Joi.number()
      .required()
      .min(1)
      .messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be at least 3 Digit",
      }),

    image: Joi.string()
      .allow("", null),
  }).required(),
});



module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number()
      .min(1)
      .max(5)
      .required(),

    comment: Joi.string()
      .min(3)
      .required()
      .messages({
        "string.min": "Comment should be at least 3 characters long",
        "string.empty": "Comment is required"
      })
  }).required()
});