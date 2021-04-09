const Joi = require("joi");

module.exports = Joi.object({
    tickerSymbol: Joi.string().required(),
    shares: Joi.number()
        .min(1)
        .required()
});