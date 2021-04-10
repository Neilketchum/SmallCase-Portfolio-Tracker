const Joi = require("joi");

module.exports = Joi.object({
    tickerSymbol: Joi.string().required(),
    method: Joi.Joi.string().valid('buy', 'sell'),
    shares: Joi.number()
        .min(1)
        .required()
});