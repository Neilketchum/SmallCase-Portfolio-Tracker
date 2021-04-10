const holding = require("../models/Holding");
var chalk = require('chalk');



var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

exports.addTrade = async (req, res) => {
    console.log(req.body)
    const tickerSymbol = req.body.tickerSymbol;
    const price = req.body.price;
    const shares = req.body.shares;
    const oldStock = await holding.findOne({ tickerSymbol });
    // Checking if user is adding on to a exisiting Stock
    if (oldStock) {
        let averagBuyPrice = (price * shares + oldStock.shares * oldStock.avgBuyPrice) / (shares + oldStock.shares);
        //Updating Existing Stock
        holding.findOneAndUpdate({ tickerSymbol },
            {
                tickerSymbol,
                avgBuyPrice: averagBuyPrice,
                shares: oldStock.shares + shares
            }, null, function (err, docs) {
                if (err) {
                    console.log(error(err))
                }
                else {
                    console.log(connected("Update Adding Stock Success"))
                    return res.status(200).send(docs)
                }
            });
    } else {
        const trade = new holding({
            tickerSymbol,
            avgBuyPrice: price,
            shares
        })
        trade.save(function (err, doc, num) {
            if (err) {
                console.log(err);
                return res.status(400).send(err)
            } else {
                return res.status(200).send(doc)
            }
        });
    }
}
exports.updateTrade = (req, res) => {
    console.log("update Trade api")
    res.status(200).json({
        "Message": "Update Trade"
    })
}
exports.sellTrade = (req, res) => {
    console.log("add Trade api")
    res.status(200).json({
        "Message": "Sell Trade"
    })
}