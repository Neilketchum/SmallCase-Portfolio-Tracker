const mongoose = require('mongoose');

const { Schema } = mongoose;

const tradeSchema = new mongoose.Schema(
    {
        tickerSymbol: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            min: 0
        },
        method: {
            type: String,
            enum: {
                values: ['SELL', 'BUY'],
            },
            required: true
        },
        shares: {
            type: Number,
            min: 0
        }
    }, {
    timestamps: true,
}
);

module.exports = mongoose.model('Trades', tradeSchema);
