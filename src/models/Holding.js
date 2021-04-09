const mongoose = require('mongoose');

const { Schema } = mongoose;

const holdingSchema = new mongoose.Schema(
    {
        tickerSymbol: {
            type: String,
            unique: true
        },
        avgBuyPrice: {
            type: Number,
            min: 0
        },
        shares: {
            type: Number,
            min: 0
        }
    }, {
    timestamps: true,
}
);

module.exports = mongoose.model('Holding', portfolioSchema);
