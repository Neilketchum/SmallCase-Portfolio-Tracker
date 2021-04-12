const Trades = require("../models/Trades")
const ObjectId = require('mongoose').Types.ObjectId;

exports.getTotalShares = async (tickerSymbol) => {
    const trades = await Trades.find({ tickerSymbol });
    let count = 0;
    trades.map(trade => {

        if (trade.method === "BUY")
            count += trade.shares;
        else if (trade.method === "SELL")
            count -= trade.shares
    })

    return count;
}
exports.getTotalBuyShares = async (tickerSymbol) => {
    const trades = await Trades.find({ tickerSymbol });
    let count = 0;
    trades.map(trade => {

        if (trade.method === "BUY")
            count += trade.shares;

    })

    return count;
}
exports.isValidObjectId = (id) => {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
