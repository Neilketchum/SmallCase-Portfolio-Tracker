const Trades = require("../models/Trades")
const { logger } = require("../utility/chalkLogger")

const { getTotalShares, getTotalBuyShares, isValidObjectId } = require("../utility/controllerhelper")

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
        // Adding Trade type BUY
        trade.save(function (err, doc, num) {
            if (err) {
                logger(err, "error");
                return res.status(400).send(err)
            } else {
                logger("Adding Trade of BUY Stock Success", "success")
                return res.status(200).send(doc)
            }
        });
    } else if (method === "SELL") {
        const count = await getTotalShares(tickerSymbol)
        if (count < shares) {
            // Cannot sell stock which you dont own
            logger("Cannot sell stock which you dont own", "error")
            return res.status(401).send("Cannot sell stock which you dont own")
        }
        else {
            // Adding Trade type SELL
            trade.save(function (err, doc, num) {
                if (err) {
                    logger(err, "error");
                    return res.status(400).send(err)
                } else {
                    logger("Adding Trade of SELL Stock Success", "success")
                    return res.status(200).send(doc)
                }
            });

        }
    }


}

exports.updateTrade = async (req, res) => {

    const tradeId = req.query.id;
    if (isValidObjectId(tradeId)) {
        const trade = await Trades.findById(tradeId);

        if (trade) {
            if (req.body.method === "BUY") {
                // Updating Trade type to BUY so no corner case
                Trades.findByIdAndUpdate(tradeId, {
                    tickerSymbol: req.body.tickerSymbol,
                    method: "BUY",
                    price: req.body.price,
                    shares: req.body.shares
                }, (err, docs) => {
                    if (err) {
                        return res.status(400).send("Something Looks Wrong")
                    } else {
                        return res.status(200).send(docs)
                    }
                })
            } else if (trade.method === "BUY" && req.body.method === "SELL") {
                const count = await getTotalShares(req.body.tickerSymbol);
                // Adding Trade type to SELL so we need to make sure the porfolio dosen't end up selling more stock than it owns.
                if ((count - trade.shares - req.body.shares) > 0) {
                    Trades.findByIdAndUpdate(tradeId, {
                        tickerSymbol: req.body.tickerSymbol,
                        method: "SELL",
                        price: req.body.price,
                        shares: req.body.shares
                    }, (err, docs) => {
                        if (err) {
                            return res.status(400).send("Something Looks Wrong")
                        } else {
                            return res.status(200).send(docs)
                        }
                    })
                } else {
                    return res.status(401).send("Cannot Update Trade as Updating this trade will result in selling more stocks than you own")
                }
            } else if (trade.method === "SELL" && req.body.method === "SELL") {
                const count = await getTotalShares(req.body.tickerSymbol);
                if ((count + trade.shares - req.body.shares) > 0) {
                    Trades.findByIdAndUpdate(tradeId, {
                        tickerSymbol: req.body.tickerSymbol,
                        method: "SELL",
                        price: req.body.price,
                        shares: req.body.shares
                    }, (err, docs) => {
                        if (err) {
                            return res.status(400).send("Something Looks Wrong")
                        } else {
                            return res.status(200).send(docs)
                        }
                    })
                } else {
                    return res.status(401).send("Cannot Update Trade as Updating this trade will result in selling more stocks than you own")
                }
            }

        } else {
            return res.status(401).send("No Trade with given ID exists");
        }
    } else {
        return res.status(401).send("Request Parameters is not a Valid ID");
    }

}
exports.removeTrade = async (req, res) => {

    const tradeId = req.query.id
    if (isValidObjectId(tradeId)) {
        const trade = await Trades.findById(tradeId);

        if (trade) {
            if (trade.method === "BUY") {
                // Removing Trade of type to SELL so we have to make sure removing a BUY trade wont result us in selling more stocks than we own
                const count = await getTotalShares(trade.tickerSymbol);
                if (count > trade.shares) {
                    const result = await Trades.findByIdAndDelete(tradeId)
                    return res.status(200).send(result)
                } else {
                    return res.status(401).send("Cannot Delete Trade as deleting this trade will result in selling more stocks than you own")
                }
            }
            if (trade.method === "SELL") {
                // Removing Trade of type to SELL so no corner case
                const result = await Trades.findByIdAndDelete(tradeId)
                return res.status(200).send(result)
            }
        } else {
            return res.status(401).send("No Trade with given ID exists");
        }
    } else {
        return res.status(401).send("Request Parameters is not a Valid ID");
    }
}