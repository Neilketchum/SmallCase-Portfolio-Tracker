const Joi = require('joi');

module.exports = Joi.object({
    tickerSymbol: Joi.string().required(),
    buyPrice: Joi.number()
        .min(0)
        .required(),
    shares: Joi.number()
        .min(1)
        .required()
})