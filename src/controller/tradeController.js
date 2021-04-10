const Trades = require("../models/Trades")
var chalk = require('chalk');
var success = chalk.bold.green;
var error = chalk.bold.red;

const getTotalShares = async (tickerSymbol) => {
    const trades = await Trades.find({ tickerSymbol });
    let count = 0;
    trades.map(trade => {

        if (trade.method === "BUY")
            count += trade.shares;
        else if (trade.method === "SELL")
            count -= trade.shares
    })
    console.log(count)
    return count;
}
exports.addTrade = async (req, res) => {
    const tickerSymbol = req.body.tickerSymbol;
    const price = req.body.price;
    const shares = req.body.shares;
    const method = req.body.method;
    const trade = new Trades({
        tickerSymbol,
        price,
        shares,
        method
    })
    if (method === "BUY") {
        trade.save(function (err, doc, num) {
            if (err) {
                console.log(error(err));
                return res.status(400).send(err)
            } else {
                console.log(success("Adding Trade of BUY Stock Success"))
                return res.status(200).send(doc)
            }
        });
    } else if (method === "SELL") {
        const count = await getTotalShares(tickerSymbol)
        if (count < shares) {
            console.log(error("Cannot sell stock which you dont own"))
            return res.status(401).send("Cannot sell stock which you dont own")
        }
        else {
            trade.save(function (err, doc, num) {
                if (err) {
                    console.log(error(err));
                    return res.status(400).send(err)
                } else {
                    console.log(success("Adding Trade of SELL Stock Success"))
                    return res.status(200).send(doc)
                }
            });

        }
    }


}

exports.updateTrade = async (req, res) => {
    const tradeId = req.params['id'];
    const trade = await Trades.findById(tradeId);
    console.log(trade)
    if (trade) {
        const count = await getTotalShares(tickerSymbol);

    } else {
        return res.status(401).send("No Trade with given ID exists");
    }
}
exports.removeTrade = async (req, res) => {
    const tradeId = req.params['id'];
    const trade = await Trades.findById(tradeId);
    console.log(trade)
    if (trade) {
        if (trade.method === "BUY") {
            const count = await getTotalShares(trade.tickerSymbol);
            if (count > trade.shares) {
                const result = await Trades.findByIdAndDelete(tradeId)
                return res.status(200).send(result)
            } else {
                return res.status(401).send("Cannot Delete Trade as deleting this trade will result in selling more stocks than you own")
            }
        }
        if (trade.method === "SELL") {
            const result = await Trades.findByIdAndDelete(tradeId)
            return res.status(200).send(result)
        }
    } else {
        return res.status(401).send("No Trade with given ID exists");
    }
}