const Joi = require('joi');

module.exports = Joi.object({
    tickerSymbol: Joi.string().required(),
    method: Joi.string().valid('BUY', 'SELL').required(),
    price: Joi.number()
        .min(0)
        .required(),
    shares: Joi.number()
        .min(1)
        .required()
})